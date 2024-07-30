import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb.js';
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import addReview from '../../utils/addReview';
import { createSkeletonRestaurantDetailTemplate, createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';

const Detail = {
    async render() {
        return `
      <app-bar></app-bar>
      <a href="#mainContent" class="skip-link">Skip to main content</a>
      <div class="detail_container" id="mainContent" tabindex="-1">${createSkeletonRestaurantDetailTemplate()}</div>
    `;
    },

    async afterRender() {
        this._showLoader();

        await this._delay(1000);

        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const resto = await RestaurantDbSource.detailRestaurant(url.id);
        this._updatePageContent(resto);

        this._hideLoader();

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('.like-button'),
            favoriteRestaurants: FavoriteRestaurantIdb,
            restaurant: {
                id: resto?.id,
                name: resto?.name,
                pictureId: resto?.pictureId,
                description: resto?.description,
                city: resto?.city,
                rating: resto?.rating,
            },
        });

        this._initAddReviewForm(url);
    },

    _showLoader() {
        const loader = document.querySelector('loader-component');
        const hero = document.querySelector('hero-bar');
        loader.style.display = 'flex';
        if (hero) hero.style.display = 'none';
    },

    _hideLoader() {
        const loader = document.querySelector('loader-component');
        loader.style.display = 'none';
    },

    _delay(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    },

    _updatePageContent(resto) {
        const skipLink = document.querySelector('.skip-link');
        const detailContent = document.querySelector('.detail_container');

        if (resto) {
            detailContent.innerHTML = createRestaurantDetailTemplate(resto);
        }

        if (skipLink) {
            skipLink.addEventListener('click', (event) => {
                event.preventDefault();
                document.querySelector('#mainContent').focus();
            });
        }

        window.scrollTo(0, 0);
    },

    _initAddReviewForm(url) {
        const addReviewContainer = document.querySelector('.add-review-form');
        const nameInput = addReviewContainer?.querySelector('.input-name');
        const reviewInput = addReviewContainer?.querySelector('.input-review');

        if (addReviewContainer) {
            addReviewContainer.addEventListener('submit', (event) => {
                event.preventDefault();

                addReview({
                    url: url?.id,
                    name: nameInput?.value,
                    review: reviewInput?.value,
                });

                addReviewContainer.reset();
            });
        }
    },
};

export default Detail;
