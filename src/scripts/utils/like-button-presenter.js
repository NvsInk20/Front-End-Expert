import { createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate } from '../view/templates/template-creator';

const LikeButtonPresenter = {
    async init({ likeButtonContainer, favoriteRestaurants, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;
        this._favoriteRestaurants = favoriteRestaurants;

        if (!this._likeButtonContainer) {
            console.error('Like button container not found!');
            return;
        }

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isRestaurantExist(id)) {
            this._renderLikedButton();
        } else {
            this._renderLikeButton();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await this._favoriteRestaurants.getRestaurants(id);
        return !!restaurant;
    },

    async _renderLikeButton() {
        this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

        const likeButton = this._likeButtonContainer.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestaurants.putRestaurants(this._restaurant);
            await this._renderButton();
        });
    },

    async _renderLikedButton() {
        this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();

        const likeButton = this._likeButtonContainer.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestaurants.deleteRestaurants(this._restaurant.id);
            await this._renderButton();
        });
    },
};

export default LikeButtonPresenter;
