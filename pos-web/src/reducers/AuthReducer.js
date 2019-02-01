import {
  SET_CURRENT_USER, LOGOUT_USER, AUTH_ERRORS, CLEAR_AUTH_ERRORS,
} from '../actions/actions';

const initialState = {
  isAuthenticated: false,
  user: {},
  authError: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload !== null,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case AUTH_ERRORS:
      return {
        ...state,
        authError: action.payload,
        isAuthenticated: false,
        user: {},
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        authError: '',
      };
    default:
      return state;
  }
}
