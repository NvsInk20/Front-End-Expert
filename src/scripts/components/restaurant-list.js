import { createSkeletonRestaurantListTemplate } from '../view/templates/template-creator';

class RestaurantList extends HTMLElement {
    constructor() {
        super();
        this._restaurants = [];
        this.exploreRestaurant = null;
        this.trendyRestaurant = null;
    }

    connectedCallback() {
        this.render();
        setTimeout(() => {
            this.exploreRestaurant = this.querySelector('.restaurants');
            this.trendyRestaurant = this.querySelector('.trendy-restaurants');
        }, 0);
    }

    render() {
        this.innerHTML = `
      <div class="content" id="main-content">
        <h1 class="label_content" tabindex="0" alt="Trendy Restaurants" id="trendy-Restaurants">Trendy Restaurants</h1>
        <div class="trendy-restaurants">${createSkeletonRestaurantListTemplate(7)}</div>
        <h1 class="label_content explore" tabindex="0" alt="Restaurant yang lainnya" id="Explore">Explore Restaurants</h1>
        <div class="restaurants">${createSkeletonRestaurantListTemplate(2)}</div>
      </div>
    `;
    }
}

customElements.define('restaurant-list', RestaurantList);
