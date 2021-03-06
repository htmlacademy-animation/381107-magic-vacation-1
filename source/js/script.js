// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import body from './modules/body.js';
import rules from './modules/rules.js';
import pathsAnimation from './modules/paths-animation';
import FullPageScroll from './modules/full-page-scroll';
import CharactersAnimation from './modules/characters-animation';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
body();
rules();
pathsAnimation();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

new CharactersAnimation(`.intro__title`, `intro__word`, 800, 400, 25).animateLine();
new CharactersAnimation(`.intro__date`, `intro__date-piece`, 600, 1200, 25).animateLine();
new CharactersAnimation(`.slider__item-title`, `animated-line`, 800, 0, 15).animateLine();
new CharactersAnimation(`.prizes__title`, `animated-line`, 800, 300, 15).animateLine();
