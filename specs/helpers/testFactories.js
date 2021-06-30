import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter';
import FavoriteRestoIdb from '../../src/scripts/data/favoriteresto-idb';

const createFavoriteButtonPresenter = async (restaurant) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
    favoriteRestaurant: FavoriteRestoIdb,
    restaurant,
  });
};

export { createFavoriteButtonPresenter };
