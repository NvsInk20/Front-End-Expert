import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Managing Restaurant Likes', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div class="like-button"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    it('should display like button if the restaurant has not been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        const likeButton = document.querySelector('[aria-label="like this restaurants"]');
        expect(likeButton).toBeTruthy();
    });

    it('should not display unlike button if the restaurant has not been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        const unlikeButton = document.querySelector('[aria-label="unlike this restaurants"]');
        expect(unlikeButton).toBeFalsy();
    });

    it('should be able to like a restaurant', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        const likeButton = document.querySelector('#likeButton');
        likeButton.dispatchEvent(new Event('click'));

        const restaurant = await FavoriteRestaurantIdb.getRestaurants(1);
        expect(restaurant).toEqual({ id: 1 });

        await FavoriteRestaurantIdb.deleteRestaurants(1);
    });

    it('should not re-add a restaurant if it is already liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        await FavoriteRestaurantIdb.putRestaurants({ id: 1 });

        const likeButton = document.querySelector('#likeButton');
        likeButton.dispatchEvent(new Event('click'));

        const allRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();
        expect(allRestaurants).toEqual([{ id: 1 }]);

        await FavoriteRestaurantIdb.deleteRestaurants(1);
    });

    it('should not add a restaurant if it has no id', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({});

        const likeButton = document.querySelector('#likeButton');
        likeButton.dispatchEvent(new Event('click'));

        const allRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();
        expect(allRestaurants).toEqual([]);
    });
});
