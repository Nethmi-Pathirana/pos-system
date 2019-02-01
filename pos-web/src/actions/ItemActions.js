import axios from 'axios';

import {
  GET_ITEMS, ITEM_LOADING, AUTH_ERRORS, GET_ERRORS,
} from './actions';

const url = 'http://localhost:8080';

// Get Items
export const getItems = () => (dispatch) => {
  dispatch(setItemLoading());
  return axios
    .get(`${url}/items`)
    .then(res => dispatch({
      type: GET_ITEMS,
      payload: res.data,
    }))
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({
          type: AUTH_ERRORS,
          payload: 'Please log in first',
        });
      } else if (err.response.status === 403) {
        dispatch({
          type: AUTH_ERRORS,
          payload: 'Session expired! Please login again',
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

// Set loading state
export const setItemLoading = () => ({
  type: ITEM_LOADING,
});
