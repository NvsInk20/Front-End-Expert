import CONFIG from '../../globals/config';

const small = 'small/';

const medium = 'medium/';

const createSkeletonRestaurantListTemplate = (count) => {
    let template = '';

    for (let i = 0; i < count; i += 1) {
        template += `
      <article class="restaurant-item" key="${i}">
      <picture>
        <img class="restaurant-item_image" src="/images/shortcut.jpg" alt="ListSkeleton" width="100%" height="350px">
      </picture>
        <div class="item_content">
          <p class="Rating Skeleton">Rating: <i class="fa-solid fa-star"></i><span>Rating Skeleton</span></p>
          <h2 class="name Skeleton">Name Skeleton</h2>
          <p class="item_desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        </div>
      </article>
    `;
    }
    return template;
};

const createSkeletonRestaurantDetailTemplate = () => `
  <div class="detail">
    <div class="rest-item">
      <div class="restaurant-img">
        <img src="/images/shortcut.jpg" alt="Skeleton-Image">
      </div>
      <div class="restaurant-info">
        <div class="skeleton-name">Name Restaurants</div>
        <p class="skeleton">Rating: <i class="fa-solid fa-star"></i><span> Rate skeleton</span></p>
        <p class="skeleton"><i class="fa-solid fa-map-marker-alt"></i> <span>Alamat Skeleton, kota Skeleton</span></p>
        <p>Kategori:</p>
        <div class="skeleton Categories">Categories</div>
        <p>Makanan:</p>
        <div class="foods">Categories Makanan</div>
        <p>Minuman:</p>
        <div class="drinks">Categories Minuman</div>
      </div>
    </div>
    <div class="restaurant-description">
      <div class="menu categories">Description:</div>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="detail">
    <div class="rest-item">
    <div class="restaurant-img">
    <picture>
    <source class="lazyload" media="(max-width: 600px)" data-srcset="${restaurant.pictureId ? `${CONFIG.BASE_IMAGE_URL}${small}${restaurant.pictureId}` : '/images/shortcut.jpg'}">
    <img class="lazyload" src="/images/shortcut.jpg"
        data-src="${restaurant.pictureId ? `${CONFIG.BASE_IMAGE_URL}${medium}${restaurant.pictureId}` : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="Restoran ${restaurant.name || '-'} Kota ${restaurant.city}">
        </picture>    
    </div>
      <div class="restaurant-info">
        <div class="restaurant-name">${restaurant.name}</div>
        <p class="restaurant-rating">Rating: <i class="fa-solid fa-star"></i><span> ${restaurant.rating}</span></p>
        <p class="restaurant-address"><i class="fa-solid fa-map-marker-alt"></i> <span>${restaurant.address}, ${restaurant.city}</span></p>
        <p>Kategori:</p>
        <div class="categories">${restaurant.categories.map((category) => `<div class="category">${category.name}</div>`).join(' ')}</div>
        <p>Makanan:</p>
        <div class="foods">${restaurant.menus.foods.map((food) => `<div class="food">${food.name}</div>`).join(' ')}</div>
        <p>Minuman:</p>
        <div class="drinks">${restaurant.menus.drinks.map((drink) => `<div class="drink">${drink.name}</div>`).join(' ')}</div>
        <div class="button">
          <div class="like-button"></div>
        </div>
      </div>
    </div>
    <div class="restaurant-description">
      <div class="menu">Description:</div>
      <p>${restaurant.description}</p>
    </div>
  </div>
  <div class="card-review-wrapper">
    <div class="review-section">
      <h2>Customer Reviews</h2>
      <div class="card-review">
        ${restaurant.customerReviews.map((review) => `
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
        `).join('')}
      </div>
    </div>
    <form class="add-review-form">
      <h2>Add Review</h2>
      <label for="name">Name</label>
      <input type="text" name="name" placeholder="Name" class="input-name" required />
      <label for="review">Review</label>
      <textarea name="review" placeholder="Review" class="input-review" required></textarea>
      <div class="submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
`;

const createRestaurantListTemplate = (restaurant) => `
  <article class="restaurant-item" key="${restaurant.id}">
    <p class="locate">Kota. ${restaurant.city || '-'}</p>
    <picture>
    <source class="lazyload" media="(max-width: 600px)" data-srcset="${restaurant.pictureId ? `${CONFIG.BASE_IMAGE_URL}${small}${restaurant.pictureId}` : '/images/shortcut.jpg'}">
    <img class="restaurant-item_image lazyload" src="/images/shortcut.jpg" data-src="${restaurant.pictureId ? `${CONFIG.BASE_IMAGE_URL}${medium}${restaurant.pictureId}` : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="Restoran ${restaurant.name || '-'} Kota ${restaurant.city}">
    </picture>
    <div class="item_content">
      <p class="item_rating" tabindex="0">Rating: <i class="fa-solid fa-star"></i><span>${restaurant.rating || '-'}</span></p>
      <h2 class="item_title" tabindex="-1">${restaurant.name || '-'}</h2>
      <p class="item_desc" tabindex="0">${restaurant.description || '-'}</p>
      <a class="checkResto" href="/#/detail/${restaurant.id}" aria-label="Lihat Restoran ${restaurant.name || '-'}">Lihat Restoran</a>
    </div>
  </article>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurants" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurants" id="likeButton" class="liked">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
    createSkeletonRestaurantDetailTemplate,
    createSkeletonRestaurantListTemplate,
    createRestaurantListTemplate,
    createRestaurantDetailTemplate,
    createLikeRestaurantButtonTemplate,
    createUnlikeRestaurantButtonTemplate,
};
