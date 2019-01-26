import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';
import OrderReducer from './OrderReducer';
import ItemReducer from './ItemReducer';

export default combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  order: OrderReducer,
  item: ItemReducer
});
