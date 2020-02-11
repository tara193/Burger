import React, { useState, useEffect, useCallback } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/OrderSummary/OrderSummary';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actionCreator from '../../store/action/index';
import { useSelector, useDispatch } from 'react-redux';

export const burgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticate = useSelector(state => state.auth.token !== null);


    const onAddedIngredients = (ingName) => dispatch(actionCreator.addIngredients(ingName));
    const onRemoveIngredients = (ingName) => dispatch(actionCreator.removeIngredients(ingName));
    const onInitIngredients = useCallback(() => dispatch(
        actionCreator.initIngredients()), []);
    const onInitPurchase = () => dispatch(actionCreator.burgerPurchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actionCreator.authRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchasableState = (ingredients) => {
        //const ingredients={...this.state.ingredients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticate) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        }
    };
    const purchaseCloseHandler = () => {
        setPurchasing(false);
    };
    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    const dislabledInfo = { ...ings };
    for (let key in dislabledInfo) {
        dislabledInfo[key] = dislabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = error ? <p style={{ padding: '20px' }}>Ingredients can't be loaded!</p> : <Spinner />;
    if (ings) {
        (burger = <Auxiliary>
            <Burger ingredients={ings} />
            <BuildControls
                ingredientsAdded={onAddedIngredients}
                ingredientsRemoved={onRemoveIngredients}
                disabled={dislabledInfo}
                ordered={purchaseHandler}
                isAuth={isAuthenticate}
                purchasable={updatePurchasableState(ings)}
                price={price} />
        </Auxiliary>
        );
        orderSummary = <OrderSummary ingredients={ings}
            purchaseCancelled={purchaseCloseHandler}
            purchaseContinue={purchaseContinueHandler}
            price={price} />;
    }
    return (
        <Auxiliary>
            <Modal show={purchasing}
                modalClosed={purchaseCloseHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
}

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticate: state.auth.token !== null
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onAddedIngredients: (ingName) => dispatch(actionCreator.addIngredients(ingName)),
//         onRemoveIngredients: (ingName) => dispatch(actionCreator.removeIngredients(ingName)),
//         onInitIngredients: () => dispatch(actionCreator.initIngredients()),
//         onInitPurchase: () => dispatch(actionCreator.burgerPurchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actionCreator.authRedirectPath(path))
//     };

export default (withErrorHandler(burgerBuilder, axios));