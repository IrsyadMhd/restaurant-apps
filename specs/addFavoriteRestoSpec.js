import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';
import * as TestFactories from './helpers/testFactories';

describe('Adding A Restaurant To Favorite', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the add favorite button when the restaurant has not been added to favorite before', async () => {
    await TestFactories.createFavoriteButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="add this restaurant to favorite"]')).toBeTruthy();
  });

  it('should not show the remove favorite button when the restaurant has not been added to favorite before', async () => {
    await TestFactories.createFavoriteButtonPresenter({ id: 1 });

    expect(document.querySelector('[aria-label="remove this restaurant from favorite]')).toBeFalsy();
  });

  it('should be able to add the restaurant to favorite', async () => {
    await TestFactories.createFavoriteButtonPresenter({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestoIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestoIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already added to favorite',
    async () => {
      await TestFactories.createFavoriteButtonPresenter({ id: 1 });

      await FavoriteRestoIdb.putRestaurant({ id: 1 });

      document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

      const restaurants = await FavoriteRestoIdb.getAllRestaurants();

      expect(restaurants).toEqual([{ id: 1 }]);

      FavoriteRestoIdb.deleteRestaurant(1);
    });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenter({});

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllRestaurants()).toEqual([]);
  });
});
