import * as actionTypes from './actionTypes';

export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type:actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId: id,
        orderData : orderData
    };
};


export const burgerPurchaseFails = (error) => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILS,
        error: error
    };
};

export const burgerPurchaseStart= () => {
    return {
        type: actionTypes.BURGER_PURCHASE_START
    };
};

export const burgerPurchaseInit = () => {
    return{
        type:actionTypes.BURGER_PURCHASE_INIT
    };
};

export const burgerPurchase = (orderData, token) => {
   return{
       type:actionTypes.BURGER_PURCHASE,
       orderData:orderData,
       token:token
   }
};

export const orderFetchStart=()=>{
    return{
        type:actionTypes.ORDER_FETCH_START
    };
};

export const orderFetchSuccess = (orders) =>{
    return {
        type:actionTypes.ORDER_FETCH_SUCCESS,
        orders:orders
    };
};

export const orderFetchFails = ( error ) => {
    return{
        type:actionTypes.ORDER_FETCH_FAILS,
        error:error
    };
};

export const orderFetch = (token,userId) => {
    return{
        type:actionTypes.ORDER_FETCH,
        token:token,
        userId:userId
    }
}