import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavoriteRestaurantArray = {
    getRestaurants(id) {
        if (!id) {
            return;
        }

        return favoriteRestaurants.find((restaurant) => restaurant.id == id);
    },

    getAllRestaurants() {
        return favoriteRestaurants;
    },

    putRestaurants(restaurant) {
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        if (this.getRestaurants(restaurant.id)) {
            return;
        }

        favoriteRestaurants.push(restaurant);
    },

    deleteRestaurants(id) {
        favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id != id);
    },

    searchRestaurants(query) {
        return this.getAllRestaurants().filter((restaurant) => {
            const loweredCaseRestaurantTitle = (restaurant.name || '-').toLowerCase();
            const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

            const loweredCaseQuery = query.toLowerCase();

            const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
            return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
        });
    },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteRestaurants = []);

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
