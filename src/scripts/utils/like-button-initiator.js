import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../view/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

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
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLikeButton() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = this._likeButtonContainer.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      await this._renderButton();
    });
  },

  _renderLikedButton() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likedButton = this._likeButtonContainer.querySelector('#likeButton');
    likedButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      await this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
