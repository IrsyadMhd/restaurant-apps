const DrawerInitiator = {
  init({ hamburger, body, drawer }) {
    hamburger.addEventListener('click', event => {
      this._toggleDrawer(event, drawer);
    });

    body.addEventListener('click', event => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },

};

export default DrawerInitiator;
