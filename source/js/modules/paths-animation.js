export default () => {
  const winHeading = document.querySelector(`.result__heading--win`);
  const lossHeading = document.querySelector(`.result__heading--loss`);

  const drawPath = (path, delay) => {
    const pathLength = path.getTotalLength();
    path.animate([
      {strokeDasharray: `0 ` + pathLength / 3},
      {strokeDasharray: pathLength / 3 + ` 0`}
    ], {
      duration: 800,
      delay,
      fill: `forwards`
    });
  };

  const animateWinSVG = (svg) => {
    svg.classList.add(`result__heading--visible`);

    svg.querySelectorAll(`path`).forEach((item) => {
      drawPath(item, 0);
    });
  };

  const animateLossSVG = (svg) => {
    svg.classList.add(`result__heading--visible`);

    let delay = 0.1;

    svg.querySelectorAll(`path`).forEach((item) => {
      item.style.strokeDasharray = `0 ` + item.getTotalLength();
      drawPath(item, delay * 1000);
      item.style.animationDelay = delay + `s`;
      delay = (delay + 0.1) * 0.8;
    });
  };

  document.querySelectorAll(`.game__button`).forEach((item) => {
    item.addEventListener(`click`, () => {
      if (item.dataset.target === `result`) {
        animateWinSVG(winHeading);
      } else if (item.dataset.target === `result3`) {
        animateLossSVG(lossHeading);
      }
    });
  });
};
