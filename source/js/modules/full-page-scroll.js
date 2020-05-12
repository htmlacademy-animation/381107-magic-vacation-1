import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);
    document.querySelector(`#menu-item-prizes`).addEventListener(`click`, () => {
      if (this.screenElements[this.activeScreen].classList.contains(`screen--story`)) {
        document.querySelector(`.screen--story`).classList.add(`screen--delayed`);
        document.querySelector(`.screen--prizes`).classList.add(`from-top`);
        setTimeout(() => {
          document.querySelector(`.screen--story`).classList.remove(`screen--delayed`);
          document.querySelector(`.screen--prizes`).classList.remove(`from-top`);
        }, 2000);
      }
    });

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
    if (this.screenElements[this.activeScreen].classList.contains(`screen--prizes`) && evt.deltaY > 0) {
      document.querySelector(`.screen--story`).classList.add(`screen--delayed`);
      document.querySelector(`.screen--prizes`).classList.add(`from-top`);
      setTimeout(() => {
        document.querySelector(`.screen--story`).classList.remove(`screen--delayed`);
        document.querySelector(`.screen--prizes`).classList.remove(`from-top`);
      }, 2000);
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
    if (document.querySelector(`.rules__item--visible`)) {
      this.clearCSSClasses(`rules__item--visible`);
    }
    if (document.querySelector(`.rules__link--visible`)) {
      this.clearCSSClasses(`rules__link--visible`);
    }
    if (document.querySelector(`.intro__title--animated`)) {
      this.clearCSSClasses(`intro__title--animated`);
    }
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }

  clearCSSClasses(className) {
    document.querySelectorAll(`.` + className).forEach((item) => {
      item.classList.remove(className);
    });
  }
}
