import { ORDER_LOADING, GET_ORDERS, GET_ORDER, ADD_ORDER, DELETE_ORDER, SET_ITEMS } from '../actions/actions';

const initialState = {
    orders: [],
    order: {},
    itemsToSelect: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ORDER_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            };
        case GET_ORDER:
            return {
                ...state,
                order: action.payload.order,
                loading: false
            };
        case ADD_ORDER:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            };
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== action.payload._id)
            };
        case SET_ITEMS:
            return {
                ...state,
                itemsToSelect: action.payload
            };
        default:
            return state;
    }
}