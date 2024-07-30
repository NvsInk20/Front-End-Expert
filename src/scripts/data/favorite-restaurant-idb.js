import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
            database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
        }
    },
});

const FavoriteRestaurantIdb = {
    async getRestaurants(id) {
        if (!id) {
            return null;
        }

        return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },
    async getAllRestaurants() {
        return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },
    async putRestaurants(restaurant) {
        if (!restaurant || !restaurant.id) {
            return null;
        }

        return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    },
    async deleteRestaurants(id) {
        return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    },

    async searchRestaurants(query) {
        const restaurants = await this.getAllRestaurants();
        const loweredCaseQuery = query.toLowerCase().replace(/\s/g, '');

        return restaurants.filter((restaurant) => {
            const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
            const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

            return jammedRestaurantName.includes(loweredCaseQuery);
        });
    },
};

export default FavoriteRestaurantIdb;
