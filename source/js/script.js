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
import FullPageScroll from './modules/full-page-scroll';
import CharactersAnimation from './modules/animated-letters';

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

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

new CharactersAnimation(`.intro__title`, `intro__word`, 800, `cubic-bezier(0.16, 0, 0.26, 0.96)`, 0, 25).prepareText();
new CharactersAnimation(`.intro__date`, `intro__date-piece`, 600, `cubic-bezier(0.16, 0, 0.26, 0.96)`, 800, 25).prepareText();
