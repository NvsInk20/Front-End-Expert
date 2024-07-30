import API_ENDPOINT from '../globals/api-endpoint';
import errorPage from '../view/pages/errorPage';

class RestaurantDbSource {
    static async restaurantList() {
        try {
            const response = await fetch(API_ENDPOINT.RESTO_LIST);
            const responseJson = await response.json();
            if (!response.ok) {
                throw new Error(responseJson.message || 'Failed to fetch restaurant list');
            }
            return responseJson.restaurants;
        } catch (error) {
            return errorPage(error.message);
        }
    }

    static async detailRestaurant(id) {
        try {
            const response = await fetch(API_ENDPOINT.DETAIL(id));
            const responseJson = await response.json();
            if (!response.ok) {
                throw new Error(responseJson.message || 'Failed to fetch restaurant details');
            }
            return responseJson?.restaurant;
        } catch (error) {
            return errorPage(error.message);
        }
    }

    static async addReviewRestaurant(data) {
        try {
            const response = await fetch(API_ENDPOINT.POST_REVIEW, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseJson = await response.json();
            if (!response.ok) {
                throw new Error(responseJson.message || 'Failed to post review');
            }
            return responseJson;
        } catch (error) {
            return errorPage(error.message);
        }
    }
}

export default RestaurantDbSource;
