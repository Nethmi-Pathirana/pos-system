import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';
import OrderReducer from './OrderReducer';
// import postReducer from './postReducer';

export default combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  order: OrderReducer,
//   post: postReducer
});
