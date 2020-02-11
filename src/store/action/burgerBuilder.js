import * as actionTypes from './actionTypes';

export const addIngredients= (ingName)=>{
    return{
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName:ingName
    };
};

export const removeIngredients = (ingName) =>{
    return{
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:ingName
    };
};

export const setIngredients = (ingredientsData)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredientsData
    };
};

export const fetchIngredientFails = () =>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILS
    };
};

export const initIngredients = () =>{
    return{
        type:actionTypes.INITI_INGREDIENTS
    }    
};

