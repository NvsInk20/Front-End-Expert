const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
    it('should return the restaurant that has been added', async () => {
        favoriteRestaurant.putRestaurants({ id: 1 });
        favoriteRestaurant.putRestaurants({ id: 2 });

        expect(await favoriteRestaurant.getRestaurants(1)).toEqual({ id: 1 });
        expect(await favoriteRestaurant.getRestaurants(2)).toEqual({ id: 2 });
        expect(await favoriteRestaurant.getRestaurants(3)).toEqual(undefined);
    });

    it('should refuse a restaurant from being added if it does not have the correct property', async () => {
        favoriteRestaurant.putRestaurants({ aProperty: 'property' });

        expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
    });

    it('can return all of the restaurants that have been added', async () => {
        favoriteRestaurant.putRestaurants({ id: 1 });
        favoriteRestaurant.putRestaurants({ id: 2 });

        expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 },
        ]);
    });

    it('should remove favorite restaurant', async () => {
        favoriteRestaurant.putRestaurants({ id: 1 });
        favoriteRestaurant.putRestaurants({ id: 2 });
        favoriteRestaurant.putRestaurants({ id: 3 });

        await favoriteRestaurant.deleteRestaurants(1);

        expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 2 }, { id: 3 }]);
    });

    it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
        favoriteRestaurant.putRestaurants({ id: 1 });
        favoriteRestaurant.putRestaurants({ id: 2 });
        favoriteRestaurant.putRestaurants({ id: 3 });

        await favoriteRestaurant.deleteRestaurants(4);

        expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });

    it('should be able to search for restaurants', async () => {
        favoriteRestaurant.putRestaurants({ id: 1, name: 'restoran a' });
        favoriteRestaurant.putRestaurants({ id: 2, name: 'restoran b' });
        favoriteRestaurant.putRestaurants({ id: 3, name: 'restoran abc' });
        favoriteRestaurant.putRestaurants({ id: 4, name: 'ini mah restoran abcd' });
        expect(await favoriteRestaurant.searchRestaurants('restoran a')).toEqual([
            { id: 1, name: 'restoran a' },
            { id: 3, name: 'restoran abc' },
            { id: 4, name: 'ini mah restoran abcd' },
        ]);
    });
};

export { itActsAsFavoriteRestaurantModel };
