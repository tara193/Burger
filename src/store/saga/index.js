import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../action/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authSaga, checkAuthDataSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {burgerPurchaseSaga, orderFetchSaga} from './order'

export function* watchAuth () {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_TIMEOUT,checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH,authSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_DATA,checkAuthDataSaga);
};
export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INITI_INGREDIENTS, initIngredientsSaga);
};

export function* watchOrder() {
    yield takeEvery(actionTypes.BURGER_PURCHASE, burgerPurchaseSaga);
    yield takeEvery(actionTypes.ORDER_FETCH, orderFetchSaga);
};
