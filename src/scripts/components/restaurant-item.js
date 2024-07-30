class RestaurantItem extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  renderLocation(city) {
    return `<p class="locate">Kota. ${city}</p>`;
  }

  renderImage(name, city, pictureId) {
    return `<img class="restaurant-item_image" src="${pictureId}" tabindex="0" alt="Restoran ${name} di Kota ${city}">`;
  }

  renderContent(name, rating, description) {
    return `
      <div class="item_content">
        <p class="item_rating"  tabindex="0">Rating : <i class="fa-solid fa-star"></i><span>${rating}</span></p>
        <h2 class="item_title" tabindex="-1">${name}</h2>
        <p class="item_desc"  tabindex="0">${description}</p>
      </div>
    `;
  }

  render() {
    const { id, city, name, pictureId, rating, description } = this._restaurant;

    this.innerHTML = `
      <div class="restaurant-item" key="${id}">
        ${this.renderLocation(city)}
        ${this.renderImage(name, city, pictureId)}
        ${this.renderContent(name, rating, description)}
      </div>
    `;
  }
}

customElements.define("restaurant-item", RestaurantItem);
