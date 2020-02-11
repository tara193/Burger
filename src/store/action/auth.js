import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    };
};

export const authFails= (error) => {
    return {
        type: actionTypes.AUTH_FAILS,
        error:error
    };
};

export const authLogout= () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    // localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const authLogoutSucceed= () => {
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthLogout = (expirationTime) => {
    return{
        type:actionTypes.CHECK_AUTH_TIMEOUT,
        expirationTime:expirationTime
    }
};
export const auth = (email, password, isSignup) => {
    return{
        type:actionTypes.AUTH,
        email:email,
        password:password,
        isSignup:isSignup
    }
};

export const authRedirectPath = (path) => {
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};

export const checkAuthData = () =>{
    return{
        type:actionTypes.CHECK_AUTH_DATA
    }
};