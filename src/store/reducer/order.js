import * as actionTypes from '../action/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState={
    orders: [],
    loading: false,
    purchased:false
};

const burgerPurchaseFails = (state, action ) => {
    return updatedObject (state, {loading:true});
};
const burgerPurchaseInit= (state, action ) => {
    return updatedObject (state, {loading:false});
};

const burgerPurchaseStart = (state, action) => {
    return updatedObject (state, {loading:true});
};

const burgerPurchaseSuccess = (state, action ) => {
    const newOrder = updatedObject(action.orderData, {id:action.orderId});
    return updatedObject(state, {
        loading:false,
        purchased:true,
        orders:state.orders.concat(newOrder)
    });
};

const orderFetchStart = (state, action) => {
    return updatedObject (state, {loading:false});
};
const orderFetchSuccess = (state, action ) => {
    return updatedObject (state,{orders:action.orders,loading:false});
};

const orderFetchFails= (state,action) => {
    return updatedObject(state, {loading:false}); 
};

const reducers =(state=initialState, action ) => {
    switch (action.type) {
        case actionTypes.BURGER_PURCHASE_START: return burgerPurchaseStart(state, action );           
        case actionTypes.BURGER_PURCHASE_INIT:  return burgerPurchaseInit (state, action);          
        case actionTypes.BURGER_PURCHASE_SUCCESS: return burgerPurchaseSuccess (state, action);          
        case actionTypes.BURGER_PURCHASE_FAILS: return burgerPurchaseFails(state, action);
        case actionTypes.ORDER_FETCH_START: return orderFetchStart (state, action);
        case actionTypes.ORDER_FETCH_SUCCESS: return orderFetchSuccess(state, action);
        case actionTypes.ORDER_FETCH_FAILS: return orderFetchFails (state, action);
        default: return state;
    }
};

export default reducers;