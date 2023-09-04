import { csrfFetch } from './csrf';
import { getSpotDetails } from './spotDetails';
import { setReviewModal } from './ui';

const GET_REVIEWS = 'reviews/GET_REVIEWS';

export const getReviews = (spotId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
        if (response.ok) {
            const body = await response.json();
            const reviews = body.Reviews;

            dispatch({ type: GET_REVIEWS, reviews });
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const postReview = (spotId, body) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            body: JSON.stringify(body)
        });
        if (response.ok) {
            const review = await response.json();
            dispatch(getSpotDetails(review.spotId));
            dispatch(setReviewModal(false));
            await dispatch(getReviews(spotId));
            window.scrollTo(0, document.body.scrollHeight);
            return review;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const deleteReview = (review) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/reviews/${review.id}`, { method: "DELETE" });
        if (response.ok) {
            await response.json();
            dispatch(getReviews(review.spotId));
            dispatch(getSpotDetails(review.spotId));
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export default function reviewsReducer(state = [], action) {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews;
        default:
            return state;
    }
};
