import FavoriteRestaurantSearchView from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('Retrieving favorite restaurants', () => {
        it('should request favorite restaurants from the model', () => {
            const favoriteRestaurants = {
                getAllRestaurants: jest.fn().mockImplementation(() => []),
            };
            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
        });
    });

    describe('When no favorite restaurants are found', () => {
        it('should display a message indicating no favorite restaurants', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-not-found').length).toEqual(1);
                done();
            });

            const favoriteRestaurants = {
                getAllRestaurants: jest.fn().mockImplementation(() => []),
            };

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });

    describe('When favorite restaurants are found', () => {
        it('should display all favorite restaurants', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
                done();
            });

            const favoriteRestaurants = {
                getAllRestaurants: jest.fn().mockImplementation(() => [{
                    id: 11,
                    city: 'C',
                    name: 'A',
                    rating: 3,
                    description: 'Sebuah restoran A',
                },
                {
                    id: 22,
                    city: 'D',
                    name: 'B',
                    rating: 4,
                    description: 'Sebuah restoran B',
                },
                ]),
            };

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });
});
