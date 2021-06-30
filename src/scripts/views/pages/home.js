import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItem, createSkeletonTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <section class="hero">
      <div class="banner">
        <h1 class="hero-text">Indonesian Food</h1>
        <p class="hero-tag">Find your favorite taste</p>
      </div>
    </section>
    <section class="list">
      <div class="list-title">
        <h2>restaurant list</h2>
      </div>
      <div class="container">${createSkeletonTemplate(21)}</div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.home();
    const restoContainer = document.querySelector('.container');
    restoContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restoContainer.innerHTML += createRestaurantItem(restaurant);
    });
  },
};

export default Home;
