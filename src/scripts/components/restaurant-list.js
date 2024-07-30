import "./restaurant-item.js";

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this._restaurants = [];
    this.exploreRestaurant = null;
    this.favoriteRestaurant = null;
  }

  connectedCallback() {
    this.render();
    setTimeout(() => {
      this.exploreRestaurant = this.querySelector(".restaurants");
      this.favoriteRestaurant = this.querySelector(".favorite-restaurants");
      this.fetchAndRenderData();
    }, 0);
  }

  /**
   * @param {any} restaurants
   */
  set restaurants(restaurants) {
    this._restaurants = restaurants;
    this.fetchAndRenderData();
  }

  fetchAndRenderData() {
    if (this.exploreRestaurant && this.favoriteRestaurant) {
      this._restaurants.forEach((restaurant) => {
        const restaurantCardItem = document.createElement("restaurant-item");
        restaurantCardItem.restaurant = restaurant;

        if (restaurant.rating > 4) {
          this.favoriteRestaurant.appendChild(restaurantCardItem);
        } else {
          this.exploreRestaurant.appendChild(restaurantCardItem);
        }
      });
    }
  }

  render() {
    this.innerHTML = `
      <div class="content" id="main-content">
        <h1 class="label_content" tabindex="0" alt="Restaurant Favorite">Favorite Restaurants</h1>
        <div class="favorite-restaurants"></div>
        <h1 class="label_content explore" tabindex="0" alt="Restaurant yang lainnya">Explore Restaurants</h1>
        <div class="restaurants"></div>
      </div>
    `;
  }
}

customElements.define("restaurant-list", RestaurantList);
