import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import './components/app-bar';
import './components/footer-bar';
import './components/loader';
import './components/hero-bar';
import './components/restaurant-list';
import './components/skipMainContent';

import App from './view/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('.nav__list'),
  content: document.querySelector('main'),
});
const setupSkipLink = () => {
  const skipLink = document.getElementById('skip-link');
  const titleElement = document.getElementById('title');

  if (skipLink) {
    skipLink.addEventListener('focus', () => {
      if (titleElement) {
        titleElement.style.marginLeft = '70px';
      }
    });

    skipLink.addEventListener('blur', () => {
      if (titleElement) {
        titleElement.style.marginLeft = '0';
      }
    });
  }
};

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  setupSkipLink();
  swRegister();
});
