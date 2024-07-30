import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Managing Unliked Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div class="like-button"></div>';
    };

    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestaurantIdb.putRestaurants({ id: 1 });
    });

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurants(1);
    });

    it('should display unlike button for liked restaurant', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        const unlikeButton = document.querySelector('[aria-label="unlike this restaurants"]');
        expect(unlikeButton).toBeTruthy();
    });

    it('should not display like button for liked restaurant', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        const likeButton = document.querySelector('[aria-label="like this restaurants"]');
        expect(likeButton).toBeFalsy();
    });

    it('should be able to remove liked restaurant from the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        const unlikeButton = document.querySelector('[aria-label="unlike this restaurants"]');
        unlikeButton.dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });

    it('should not throw error when unliking a restaurant that is not in the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
        await FavoriteRestaurantIdb.deleteRestaurants(1);

        const unlikeButton = document.querySelector('[aria-label="unlike this restaurants"]');
        unlikeButton.dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
});
