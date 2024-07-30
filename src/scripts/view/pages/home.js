import RestaurantDbSource from '../../data/restaurantdb-source';
import displayRestaurants from '../../utils/display-resto';

const HomePage = {
  async render() {
    return `
      <restaurant-list></restaurant-list>
    `;
  },

  async afterRender() {
    const main = document.querySelector('main');
    const hero = document.querySelector('hero-bar');
    const loader = document.querySelector('loader-component');
    const restoLists = document.querySelector('.restaurants');
    const trendyRestoList = document.querySelector('.trendy-restaurants');

    this._toggleLoading(true, main, hero, loader);

    await this._fetchAndDisplayRestaurants(restoLists, trendyRestoList);

    this._toggleLoading(false, main, hero, loader);
  },

  _toggleLoading(isLoading, main, hero, loader) {
    const mainElement = main;
    const heroElement = hero;
    const loaderElement = loader;

    if (isLoading) {
      mainElement.style.display = 'none';
      if (heroElement) heroElement.style.display = 'none';
      loaderElement.style.display = 'flex';
    } else {
      loaderElement.style.display = 'none';
      mainElement.style.display = 'block';
      if (heroElement) heroElement.style.display = 'block';
    }
  },

  async _fetchAndDisplayRestaurants(restoLists, trendyRestoList) {
    const restaurants = await RestaurantDbSource.restaurantList();

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    displayRestaurants(restaurants, restoLists);
    displayRestaurants(
      restaurants.filter((restaurant) => restaurant.rating >= 4.0),
      trendyRestoList,
    );
  },
};

export default HomePage;
