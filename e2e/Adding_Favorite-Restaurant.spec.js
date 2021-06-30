/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Adding Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('adding favorite restaurant', async ({ I }) => {
  I.see('Not Found. Please add your favorite restaurant!', '.empty-db');

  I.amOnPage('/');

  I.seeElement('.resto-detail');

  const firstRestaurant = locate('.resto-detail').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-detail');
  const favoriteRestaurantName = await I.grabTextFrom('.resto-detail');

  assert.strictEqual(firstRestaurantName, favoriteRestaurantName);
});

Scenario('removing favorite Restaurant', async ({ I }) => {
  I.see('Not Found. Please add your favorite restaurant!', '.empty-db');

  I.amOnPage('/');

  I.seeElement('.resto-detail');

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.resto-detail').at(i));
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-detail');
  const removeFavoriteRestaurant = locate('.resto-detail').last();
  const removeFavoriteRestaurantName = await I.grabTextFrom(removeFavoriteRestaurant);
  I.click(removeFavoriteRestaurant);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  const numOfFavoriteRestaurant = await I.grabNumberOfVisibleElements('.resto-detail');

  for (let i = 1; i <= numOfFavoriteRestaurant.length; i++) {
    const favoriteRestaurant = locate('.resto-detail').at(i);
    const favoriteRestaurantName = await I.grabTextFrom(favoriteRestaurant);
    assert.notStrictEqual(removeFavoriteRestaurantName, favoriteRestaurantName);
  }
});
