export default class CharactersAnimation {
  constructor(
      elementSelector,
      classNameForWord,
      duration,
      initialDelay,
      delayCoefficient
  ) {
    this.elementSelector = elementSelector;
    this.classNameForWord = classNameForWord;
    this.duration = duration;
    this.element = document.querySelector(this.elementSelector);
    this.initialDelay = initialDelay;
    this.delayCoefficient = delayCoefficient;
  }

  animateSingleCharacter(character) {
    const span = document.createElement(`span`);
    const delay = this.delayCoefficient * Math.floor(Math.random() * 10);

    span.textContent = character;
    span.style.animationDuration = `${this.duration}ms`;
    span.style.animationDelay = `${this.initialDelay + delay}ms`;
    return span;
  }

  animateLine() {
    if (!this.element) {
      return;
    }

    const text = this.element.textContent.trim().split(` `).filter((character) => character !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, character) => {
        fragment.appendChild(this.animateSingleCharacter(character));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(this.classNameForWord);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.classList.add(`no-overflow`);
    this.element.appendChild(content);
  }
}
