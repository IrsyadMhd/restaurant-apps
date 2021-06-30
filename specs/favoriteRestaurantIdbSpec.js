import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestoContract';

import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';

describe('favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestoIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestoIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestoIdb);
});
