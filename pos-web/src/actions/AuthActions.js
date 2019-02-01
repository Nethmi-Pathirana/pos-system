import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/AuthToken';

import {
  GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS, LOGOUT_USER,
} from './actions';

const url = 'http://localhost:8080';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`${url}/users/register`, userData)
    .then(() => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

// Login - Get User Token
export const loginUser = userData => dispatch => axios
  .post(`${url}/users/login`, userData)
  .then((res) => {
    // Save to localStorage
    const { token } = res.data;
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  })
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));

// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  setAuthToken(false);
  // Logout user
  dispatch({
    type: LOGOUT_USER,
  });
};

// Clear errors
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
