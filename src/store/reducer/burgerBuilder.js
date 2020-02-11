import * as actionType from '../action/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState={
    ingredients: null,
    totalPrice:4,
    error:false,
    building:false
};

const INGREDIENT_PRICE= {
    salad:0.5,
    cheese:0.4,
    bacon :0.3,
    meat:1
};

const addIngredients = (state,action) => {
    const updatedIngredient =  { [action.ingredientName] : state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState= {ingredients:updatedIngredients, 
        totalPrice:state.totalPrice  + INGREDIENT_PRICE[action.ingredientName], 
        building:true}
    return updatedObject(state, updatedState);
};

const removeIngredients = (state, action ) => {
    const updatedIng =  {[action.ingredientName] : state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt= {ingredients:updatedIngs, 
        totalPrice:state.totalPrice  - INGREDIENT_PRICE[action.ingredientName],
        building:true}
    return updatedObject(state, updatedSt);
};

const setIngredients = (state, action) => {
        return updatedObject (state,{
        ingredients : action.ingredients,
        totalPrice:4,
        error: false,
        building:false
    });
};

const fetchIngredientsFails=(state, action ) => {
    return updatedObject(state, {error:true});
};

const reducers =(state=initialState, action)=>{
    switch (action.type) {
        case actionType.ADD_INGREDIENTS: return addIngredients(state,action);           
        case actionType.REMOVE_INGREDIENTS: return removeIngredients(state,action);                
        case actionType.SET_INGREDIENTS:return setIngredients(state, action);     
        case actionType.FETCH_INGREDIENTS_FAILS: return fetchIngredientsFails (state, action);                        
        default:return state;
    }
}

export default reducers;