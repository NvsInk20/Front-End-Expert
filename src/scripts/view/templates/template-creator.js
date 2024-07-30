import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
<div class="detail">
<div class="rest-item">
  <div class="restaurant-img">
    <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="Restaurant-Image">
  </div>
  <div class="restaurant-info">
    <div class="restaurant-name">${restaurant.name}</div>
    <p class="restaurant-rating">Rating : <i class="fa-solid fa-star"></i><span> ${restaurant.rating}</span></p>
    <p class="restaurant-address"><i class="fa-solid fa-map-marker-alt"></i> <span>${restaurant.address}, ${restaurant.city}</span></p>
    <p>Kategori : </p>
    <div class="categories">${restaurant.categories.map((category) => `<div class="category">${category.name}</div>`).join(' ')}</div>
    <p>Makanan : </p>
    <div class="foods">${restaurant.menus.foods.map((food) => `<div class="food">${food.name}</div>`).join(' ')}</div>
    <p>Minuman : </p>
    <div class="drinks">${restaurant.menus.drinks.map((drink) => `<div class="drink">${drink.name}</div>`).join(' ')}</div>
    <div class="button">
      <div class="like-button"></div>
    </div>  
    </div>
</div>
<div class="restaurant-description">
  <div class="menu">Description :</div>
  <p>${restaurant.description}</p>
</div>
</div>
<div class="card-review-wrapper">
<div class="review-section">
  <h2>Customer Reviews</h2>
  <div class="card-review">
    ${restaurant.customerReviews
    .map(
      (review) => `
    <div class="review-item">
      <div class="reviewer-info">
        <i class="fa-solid fa-circle-user"></i>
        <div class="reviewer">
          <p>${review.name}</p>
          <p>${review.date}</p>
        </div>
      </div>
      <div class="review-desc">
        <p>${review.review}</p>
      </div>
    </div>
    `,
    )
    .join('')}
  </div>
</div>
<form class="add-review-form">
  <h2>Add Review</h2>
  <label for="name">Name</label>
  <input type="text" name="name" placeholder="Name" class="input-name" required />
  <label for="review">Review</label>
  <textarea type="text" name="review" placeholder="Review" class="input-review" required></textarea>
  <div class="submit">
    <button type="submit">Submit</button>
  </div>
</form>
</div>
`;

const createRestaurantListTemplate = (restaurant) => `
    <article class="restaurant-item" key="${restaurant.id}" >
    <p class="locate">Kota. ${restaurant.city}</p>
    <img class="restaurant-item_image" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" tabindex="0" alt="Restoran ${restaurant.name} di Kota ${restaurant.city}">
    <div class="item_content">
    <p class="item_rating" tabindex="0">Rating : <i class="fa-solid fa-star"></i><span>${restaurant.rating}</span></p>
    <h2 class="item_title" tabindex="-1">${restaurant.name}</h2>
    <p class="item_desc" tabindex="0">${restaurant.description}</p>
    </div>
    <a class="checkResto" href="/#/detail/${restaurant.id}" aria-label="Lihat Restoran ${restaurant.name}">Lihat Restoran</a>
    </article>
`;

const createLikeButtonTemplate = () => `
    <button aria-label="unlike this movie" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

const createLikedButtonTemplate = () => `
    <button aria-label="unlike this movie" id="likeButton" class="liked">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
  createRestaurantListTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
