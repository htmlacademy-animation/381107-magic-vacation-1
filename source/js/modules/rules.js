export default () => {
  let rulesLead = document.querySelector(`.rules__lead`);
  let rules = document.querySelectorAll(`.rules__item`);
  let lastRulesItem = document.querySelector(`.rules__item:last-of-type`);
  let rulesLink = document.querySelector(`.rules__link`);
  let timeoutValue = 0;

  rulesLead.addEventListener(`animationend`, () => {
    for (let i = 0; i < rules.length; i++) {
      timeoutValue = 300 * i;
      setTimeout(() => {
        rules[i].classList.add(`rules__item--visible`);
      }, timeoutValue);
    }
  });

  lastRulesItem.addEventListener(`animationend`, () => {
    rulesLink.classList.add(`rules__link--visible`);
  });
};
