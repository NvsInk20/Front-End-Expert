const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
    I.seeElement('#searchInput');
    I.see('Tidak menemukan Restoran', '.restaurant-not-found');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Tidak menemukan Restoran', '.restaurant-not-found');

    I.amOnPage('/');
    I.waitForElement('.restaurant-item a', 2);

    const firstRestaurantLink = locate('.restaurant-item a').first();
    const firstRestaurantTitle = locate('.item_title').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurantTitle);

    I.click(firstRestaurantLink);
    I.waitForElement('#likeButton', 3);
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.restaurant-item', 3);

    const likedRestaurantName = await I.grabTextFrom('.item_title');
    assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
    I.see('Tidak menemukan Restoran', '.restaurant-not-found');

    I.amOnPage('/');
    I.waitForElement('.restaurant-item a', 2);

    const firstRestaurantLink = locate('.restaurant-item a').first();
    const firstRestaurantTitle = locate('.item_title').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurantTitle);

    I.click(firstRestaurantLink);
    I.waitForElement('#likeButton', 3);
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.waitForElement('.restaurant-item', 3);

    const likedRestaurantName = await I.grabTextFrom('.item_title');
    assert.strictEqual(firstRestaurantName, likedRestaurantName);

    I.click(locate('.restaurant-item a').first());
    I.waitForElement('#likeButton', 3);
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    const noFavoriteMessage = await I.grabTextFrom('.restaurant-not-found');
    assert.strictEqual(noFavoriteMessage, 'Tidak menemukan Restoran');
});

Scenario('Add Review', async ({ I }) => {
    I.see('Tidak menemukan Restoran', '.restaurant-not-found');

    I.amOnPage('/');
    I.waitForElement('.restaurant-item a', 2);
    I.click(locate('.restaurant-item a').first());

    I.waitForElement('.add-review-form', 5);
    const reviewText = 'Lezat Banget Sumpahh';

    I.fillField('input[name="name"]', 'William');
    I.fillField('textarea[name="review"]', reviewText);
    I.click('button[type="submit"]');

    I.waitForText(reviewText, 10, '.review-desc p');
    const reviewTexts = await I.grabTextFromAll('.review-desc p');
    const latestReviewText = reviewTexts[reviewTexts.length - 1];
    assert.strictEqual(latestReviewText, reviewText);
});

Scenario('searching restaurants', async ({ I }) => {
    I.see('Tidak menemukan Restoran', '.restaurant-not-found');

    I.amOnPage('/');
    I.waitForElement('.restaurant-item a', 2);

    const firstRestaurantTitle = locate('.item_title').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurantTitle);

    for (let i = 1; i <= 3; i++) {
        I.click(locate('.restaurant-item a').at(i));
        I.waitForElement('#likeButton', 3);
        I.click('#likeButton');
        I.amOnPage('/');
    }

    I.amOnPage('/#/favorite');
    I.waitForElement('#searchInput', 3);

    const searchTerm = firstRestaurantName.slice(0, 3);
    I.fillField('#searchInput', searchTerm);
    I.pressKey('Enter');
    I.waitForElement('.restaurant-item', 3);

    const visibleLikedRestaurants = await I.grabTextFrom('.item_title');
    assert.strictEqual(visibleLikedRestaurants, firstRestaurantName);
});
