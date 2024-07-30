import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import displayRestaurants from '../../utils/display-resto';

const Favorite = {
  async render() {
    return `
      <app-bar></app-bar>
      <a href="#mainContent" class="skip-link">Skip to main content</a>
      <div class="content">
        <h2 class="label_content">Favorite Restaurants</h2>
        <restaurant-list class="restaurants"></restaurant-list>
        <loader-component class="loader"></loader-component>
      </div>
    `;
  },

  async afterRender() {
    this._initializePage();

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restoLists = document.querySelector('.restaurants');
    const labelContent = document.querySelector('.label_content');
    const content = document.querySelector('.content');
    const loader = document.querySelector('.loader');

    await this._delay(1000);

    this._updateContent({
      content,
      labelContent,
      restaurants,
      restoLists,
    });

    loader.style.display = 'none';
  },

  _initializePage() {
    const hero = document.querySelector('hero-bar');
    const trendyTitle = document.querySelector('#trendy-Restaurants');
    const trendyRestoList = document.querySelector('.trendy-restaurants');
    const skipLinks = document.querySelector('.skip-link');
    const mainContent = document.querySelector('.content');
    const loader = document.querySelector('.loader');

    window.scrollTo(0, 0);
    mainContent.setAttribute('id', 'mainContent');
    mainContent.setAttribute('tabindex', '-1');
    if (skipLinks) skipLinks.setAttribute('href', '#trendy-Restaurants');
    if (trendyTitle) trendyTitle.style.display = 'none';
    if (trendyRestoList) trendyRestoList.style.display = 'none';
    if (hero) hero.style.display = 'none';
    loader.style.display = 'flex';
  },

  _delay(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  },

  _updateContent({
    content, labelContent, restaurants, restoLists,
  }) {
    const updatedContent = content;
    const updatedLabelContent = labelContent;
    updatedContent.style.marginTop = '50px';
    updatedLabelContent.textContent = 'Favorite Restaurants';

    displayRestaurants(restaurants, restoLists);

    updatedContent.style.height = restaurants.length === 0 ? '100vh' : 'auto';
  },
};

export default Favorite;
