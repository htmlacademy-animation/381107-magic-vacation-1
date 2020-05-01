export default () => {
  let body = document.body;

  window.addEventListener("load", () => {
    body.classList.add("body-ready");
  });
};
