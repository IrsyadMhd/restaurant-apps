import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/detail-page.css';
import '../styles/error.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  hamburger: document.querySelector('#hamburger'),
  drawer: document.querySelector('nav ul'),
  body: document.querySelector('body'),
  main: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
