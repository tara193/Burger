import reducer from './auth';
import * as actionTypes from '../action/actionTypes';

describe('receiving intial state for unknown actionType', ()=>{
    let initialState;
    beforeEach(()=>{        
            initialState = {
                    token: null,
                    userId:null,
                    error:null,
                    loading:false,
                    authRedirectPath: '/'
                }
    });
    it('return initalState if unknown actionType',()=>{
        expect(reducer(undefined ,{})).toEqual(initialState);
    });

    it('authsuccess actiontype', ()=>{
        expect( reducer (initialState,{
            type:actionTypes.AUTH_SUCCESS,
            idToken:'some-user-token',
            userId:'some-user-id'
        })).toEqual({
            token: 'some-user-token',
            userId:'some-user-id',
            error:null,
            loading:false,
            authRedirectPath: '/'
        });
    });

});