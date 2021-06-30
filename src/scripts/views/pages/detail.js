import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetail } from '../templates/template-creator';
import ReviewButtonInitiator from '../../utils/review-button-initiator';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import FavoriteRestoIdb from '../../data/favoriteresto-idb';

const Detail = {
  async render() {
    return `
          <div class="detail-container">
            <div id="loader" class="detail"></div>
          </div>          
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { error, message, restaurant } = await RestaurantSource.detailResto(url.id);
    const restoContainer = document.querySelector('.detail-container');

    if (!error) {
      restoContainer.innerHTML = createRestaurantDetail(restaurant);

      ReviewButtonInitiator.init({
        button: document.querySelector('.accordion'),
        panel: document.querySelector('.panel'),
        arrow: document.querySelector('.arrow'),
        reviews: restaurant.customerReviews,
      });

      FavoriteButtonPresenter.init({
        favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
        favoriteRestaurant: FavoriteRestoIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          city: restaurant.city,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          description: restaurant.description,
        },
      });
    } else {
      restoContainer.innerHTML = `<h1 class="error">Error : ${message}</h1>`;
    }
  },
};

export default Detail;
