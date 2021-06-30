import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';
import * as TestFactories from './helpers/testFactories';

describe('Remove A Restaurant From Favorite', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await FavoriteRestoIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteRestaurant(1);
  });

  it('should show the remove favorite button when a restaurant has been added to favorite',
    async () => {
      await TestFactories.createFavoriteButtonPresenter({ id: 1 });

      expect(document.querySelector('[aria-label="remove this restaurant from favorite"]')).toBeTruthy();
    });

  it('should not show the add to favorite button when the restaurant has been added to favorite', async () => {
    await TestFactories.createFavoriteButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="add this restaurant to favorite"]')).toBeFalsy();
  });

  it('should be able to remove the restaurant from favorite', async () => {
    await TestFactories.createFavoriteButtonPresenter({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestoIdb.getAllRestaurants();

    expect(restaurant).toEqual([]);
  });

  it('should not throw error if the removed restaurant is not in the list',
    async () => {
      await TestFactories.createFavoriteButtonPresenter({ id: 1 });

      await FavoriteRestoIdb.deleteRestaurant(1);

      document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

      const restaurant = await FavoriteRestoIdb.getAllRestaurants();

      expect(restaurant).toEqual([]);
    });
});
