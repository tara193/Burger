import * as actionTypes from '../action/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState={
    token: null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath: '/'
}

const authStart = (state , action ) => {
    return updatedObject(state, {loading: true });
}

const authSuccess = ( state, action ) => {
    return updatedObject (state, {
        token:action.idToken,
        userId:action.userId,
        error:null,
        loading:false
    });
}

const authFails = (state, action ) => {
    return updatedObject ( state, {
        error:action.error,
        loading:false
    });
}

const authLogout = (state, action) => {
    return updatedObject( state, {
        token:null,
        userId:null
    });
}

const authRedirectPath = (state, action) => {
    return updatedObject(state, {
        authRedirectPath:action.path
    });
}
const reducers =( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.AUTH_START:return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILS: return authFails( state, action );
        case actionTypes.AUTH_LOGOUT: return authLogout ( state, action); 
        case actionTypes.SET_AUTH_REDIRECT_PATH: return authRedirectPath(state, action);
        default:return state ;
    }
}

export default reducers;