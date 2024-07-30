import { createRestaurantListTemplate } from '../view/templates/template-creator.js';

function displayRestaurants(restaurants, restoList) {
    const updatedRestoList = restoList;
    updatedRestoList.innerHTML = '';

    if (restaurants.length === 0) {
        updatedRestoList.innerHTML = '<div class="restaurant-not-found">Tidak menemukan Restoran</div>';
    } else {
        restaurants.forEach((restaurant, index) => {
            const delay = index * 50 + 100;
            const template = createRestaurantListTemplate(restaurant, delay);
            updatedRestoList.insertAdjacentHTML('beforeEnd', template);
        });
    }
}

export default displayRestaurants;
