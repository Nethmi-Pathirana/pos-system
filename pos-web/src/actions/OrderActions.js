import axios from 'axios';

import { ADD_ORDER, GET_ORDERS, GET_ORDER, GET_ERRORS, CLEAR_ERRORS, ORDER_LOADING } from './actions';

const url = "http://localhost:8080";

//Get Orders
export const getOrders = () => dispatch => {
    dispatch(setOrderLoading());
    axios
    .get(`${url}/orders`)
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDERS,
        payload: null
      })
    );
};

// Get Order
export const getOrder = id => dispatch => {
    dispatch(setOrderLoading());
    axios
      .get(`/orders/${id}`)
      .then(res =>
        dispatch({
          type: GET_ORDER,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ORDER,
          payload: null
        })
      );
};

// Add Order
export const addOrder = orderData => dispatch => {
    dispatch(clearErrors());
    axios
      .post(`${url}/orders`, orderData)
      .then(res =>
        dispatch({
          type: ADD_ORDER,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};

// Add Item
export const addItem = (orderID, itemData) => dispatch => {
    dispatch(clearErrors());
    axios
      .post(`/orders/add-item/${orderID}`, itemData)
      .then(res =>
        dispatch({
          type: GET_ORDER,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Delete Item
export const deleteItem = (orderID, itemID) => dispatch => {
    axios
    .delete(`/orders/delete-item/${orderID}/${itemID}`)
    .then(res =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setOrderLoading = () => {
    return {
      type: ORDER_LOADING
    };
  };
  
  // Clear errors
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
  
