import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GET_SPOTS'

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    const data = await response.json();
    const spots = data.Spots;
    dispatch({ type: GET_SPOTS, spots });
    return response;
};

export const postSpot = (body, url) => async () => {
    body.lat = 90;
    body.lng = 30;
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(body)
    });
    const spot = await response.json();

    await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: "POST",
        body: JSON.stringify({ url, preview: true })
    });

    return spot;
};
export const putSpot = (spotId, body) => async dispatch => {
    body.lat = 100;
    body.lng = 100;
    const response = await csrfFetch('/api/spots/' + spotId, {
        method: "PUT",
        body: JSON.stringify(body)
    });
    return await response.json();
};

export const deleteSpot = (spotId) => async () => {
    const response = await csrfFetch('/api/spots/' + spotId, { method: "DELETE", });
    return await response.json();
};

export default function spotsReducer(state = {}, action) {
    switch (action.type) {
        case GET_SPOTS:
            return action.spots.reduce((spots, spot) => {
                spots[spot.id] = spot;
                return spots;
            }, {});
        default:
            return state;
    }
};
