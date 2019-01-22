import { SET_CURRENT_USER } from '../actions/actions';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload !== null,
        user: action.payload
      };
    default:
      return state;
  }
}
