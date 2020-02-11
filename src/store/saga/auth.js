import {put, delay} from 'redux-saga/effects';
import * as actionCreator from '../action/index';
import axios from 'axios';

export function* logoutSaga (action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationDate');
    yield put(actionCreator.authLogoutSucceed());
};

export function* checkAuthTimeoutSaga (action) {
    yield delay (action.expirationTime * 1000);
    yield put(actionCreator.authLogout());
};

export function* authSaga (action){
    yield put(actionCreator.authStart());
    const authData = {
        email:action.email,
        password:action.password,
        returnSecureToken:true
    }
    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDthuFuSLFNowVzKORL6_-QDRmF7OHJIws'
    if(!action.isSignup){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDthuFuSLFNowVzKORL6_-QDRmF7OHJIws'
    }
    try{
        const response= yield axios.post(url, authData);
        const expirationDate= yield new Date (new Date ().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('userId',response.data.localId);
        yield localStorage.setItem('expirationDate',expirationDate);
        yield put(actionCreator.authSuccess(response.data.idToken,response.data.localId));
        yield put(actionCreator.checkAuthLogout(response.data.expiresIn));
    } catch (error){
        yield put(actionCreator.authFails(error.response.data.error));
    }
}

export function* checkAuthDataSaga( action ) {
    const token = yield localStorage.getItem('token');
    if(!token){
        yield put (actionCreator.authLogout());
    }
    else{
    const expirationDate= yield new Date (localStorage.getItem('expirationDate'));
        if(expirationDate<= new Date()){
            yield put(actionCreator.authLogout());
        }
        else{
        const userId = yield localStorage.getItem('userId');
        yield put (actionCreator.authSuccess (token,userId));
        yield put (actionCreator.checkAuthLogout((expirationDate.getTime() - new Date().getTime())/1000));
        }
    }
}