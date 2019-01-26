import { ITEM_LOADING, GET_ITEMS } from '../actions/actions';

const initialState = {
    items: [],
    loading: false,
};

export default function (state = initialState, action){
    switch (action.type){
        case ITEM_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        default:
            return state;        
    }
}