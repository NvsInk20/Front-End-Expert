import RestaurantDbSource from '../data/restaurantdb-source.js';
import cardReview from '../components/review.js';

const addReview = async ({ url, name, review }) => {
  const userInputData = {
    id: url,
    name,
    review,
  };

  const reviewContainer = document.querySelector('.card-review');

  try {
    const restaurant = await RestaurantDbSource.addReviewRestaurant(userInputData);
    reviewContainer.innerHTML = restaurant.customerReviews.map((reviewData) => cardReview(reviewData)).join('');
  } catch (error) {
    console.error('Failed to post review:', error);
  }
};

export default addReview;
