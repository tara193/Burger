import { put } from 'redux-saga/effects';
import axios from '../../axios-order';
import * as actionCreator from '../action/index';

export function* burgerPurchaseSaga(action) {
    yield put (actionCreator.burgerPurchaseStart());
    try{
        const response = yield axios.post('/orders.json?auth='+ action.token, action.orderData);
        yield put (actionCreator.burgerPurchaseSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put (actionCreator.burgerPurchaseFails(error))
    }
};

export function* orderFetchSaga (action) {
        yield put (actionCreator.orderFetchStart());
        const queryParam = '?auth='+action.token + '&orderBy="userId"&equalTo="'+ action.userId + '"';
        try{
            const response = yield axios.get('/orders.json'+queryParam);
            const fetchOrders=[];
            for(let key in response.data){
                fetchOrders.push({
                    ...response.data[key],
                    id:key
                });
            } 
            yield put (actionCreator.orderFetchSuccess(fetchOrders));
        } catch (error) {
            yield put (actionCreator.orderFetchFails(error));
    }
}