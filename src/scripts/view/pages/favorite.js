import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view.js';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter.js';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter.js';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
    async render() {
        return view.getTemplate();
    },

    async afterRender() {
        this.initializePage();

        const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
        const content = document.querySelector('.content');
        const loader = document.querySelector('.loader');

        await this.delay(1000);

        this.updateContent({
            content,
            restaurants,
        });

        if (loader) loader.style.display = 'flex';
    },

    initializePage() {
        const mainContent = document.querySelector('.content');
        const skipLinks = document.querySelector('.skip-link');
        const trendyTitle = document.querySelector('#trendy-Restaurants');
        const trendyRestoList = document.querySelector('.trendy-restaurants');
        const hero = document.querySelector('hero-bar');
        const loader = document.querySelector('.loader');

        window.scrollTo(0, 0);
        mainContent.setAttribute('id', 'mainContent');
        mainContent.setAttribute('tabindex', '-1');
        if (skipLinks) skipLinks.setAttribute('href', '#trendy-Restaurants');
        if (trendyTitle) trendyTitle.style.display = 'none';
        if (trendyRestoList) trendyRestoList.style.display = 'none';
        if (hero) hero.style.display = 'none';
        if (loader) loader.style.display = 'flex';
    },

    delay(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    },

    updateContent({ content, restaurants }) {
        const updatedContent = content;
        const labelContent = document.querySelector('.label_content');
        updatedContent.style.marginTop = '50px';

        if (!restaurants) {
            console.log(restaurants);
        } else {
            new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
            new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
        }

        labelContent.textContent = 'Favorite Restaurants';
        updatedContent.style.height = restaurants.length === 0 ? '100vh' : 'auto';
    },
};

export default Favorite;
