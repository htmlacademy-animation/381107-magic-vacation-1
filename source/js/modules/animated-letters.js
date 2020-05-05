export default class CharactersAnimation {
  constructor(
    elementSelector,
    classNameForWord,
    duration,
    timingFunction,
    initialDelay,
    delayCoefficient
  ) {
    this._elementSelector = elementSelector;
    this._classNameForWord = classNameForWord;
    this._duration = duration;
    this._timingFunction = timingFunction;
    this._element = document.querySelector(this._elementSelector);
    this._initialDelay = initialDelay;
    this._delayCoefficient = delayCoefficient;

    this.prepareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    let delay = this._delayCoefficient * Math.floor(Math.random() * 10);

    span.textContent = letter;
    span.style.animationDuration = `${this._duration}ms`;
    span.style.animationTimingFunction = `${this._timingFunction}`;
    span.style.animationDelay = `${this._initialDelay + delay}ms`;
    return span;
  }

  prepareText() {
    if (!this._element) {
      return;
    }

    const text = this._element.textContent.trim().split(` `).filter((latter)=>latter !== '');

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, latter) => {
        fragment.appendChild(this.createElement(latter));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(this._classNameForWord);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }
}

const animatedIntroTitle = new CharactersAnimation(`.intro__title`, `intro__word`, 800, `cubic-bezier(0.16, 0, 0.26, 0.96)`, 0, 25);
const animatedIntroDate = new CharactersAnimation(`.intro__date`, `intro__date-piece`, 600, `cubic-bezier(0.16, 0, 0.26, 0.96)`, 800, 25);
