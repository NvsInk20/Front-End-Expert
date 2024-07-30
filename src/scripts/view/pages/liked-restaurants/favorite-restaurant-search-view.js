import { createSkeletonRestaurantListTemplate, createRestaurantListTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
        <app-bar></app-bar>
            <div class="content">
            <h2 class="label_content">Favorite Restaurants</h2>
                    <div class="search-container">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="searchInput" placeholder="Search Restaurants">
                        </div>
                <div class="restaurants" id="restaurants">
                    ${createSkeletonRestaurantListTemplate(3)}
                </div>
                </div>
            </div>
        `;
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('searchInput').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    showFavoriteRestaurants(restaurants = []) {
        let html;
        if (restaurants.length) {
            html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantListTemplate(restaurant)), '');
        } else {
            html = this._getEmptyRestaurantTemplate();
        }

        document.getElementById('restaurants').innerHTML = html;

        document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
    }

    _getEmptyRestaurantTemplate() {
        return `
        <div class="restaurant-not-found">Tidak menemukan Restoran</div>`;
    }
}

export default FavoriteRestaurantSearchView;
