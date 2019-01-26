import axios from 'axios';

import { GET_ITEMS, ITEM_LOADING } from './actions';

const url = "http://localhost:8080";

// Get Items
export const getItems = () => dispatch => {
    dispatch(setItemLoading());
    return axios
        .get(`${url}/items`)
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ITEMS,
                payload: null
            })
        );
};

// Set loading state
export const setItemLoading = () => {
    return {
        type: ITEM_LOADING
    };
};