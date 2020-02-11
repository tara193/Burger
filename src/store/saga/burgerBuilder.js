import {put} from 'redux-saga/effects';
import axios from '../../axios-order';
import * as actionCreator from '../action/index';

export function* initIngredientsSaga(action) {
    try{
        const response = yield axios.get('https://react-burger-1efd5.firebaseio.com/ingredients.json');
        yield put (actionCreator.setIngredients(response.data))
    } catch (error){
        yield put (actionCreator.fetchIngredientFails());
    }
};