import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    hamburger, body, drawer, main,
  }) {
    this._hamburger = hamburger;
    this._body = body;
    this._drawer = drawer;
    this._main = main;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      hamburger: this._hamburger,
      body: this._body,
      drawer: this._drawer,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._main.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
