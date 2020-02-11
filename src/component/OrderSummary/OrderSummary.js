import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../UI/Button/Button';

const orderSummary = props => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}> {igKey} : {props.ingredients[igKey]}</span>
                </li>
            )
        });
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p> <strong> Total Price: {props.price.toFixed(2)} </strong> </p>
            <p>Ready to Checkout?</p>
            <Button clicked={props.purchaseCancelled} btntype="Danger"> CANCLE </Button>
            <Button clicked={props.purchaseContinue} btntype="Success"> CONTINUE </Button>
        </Auxiliary>
    );
}

export default orderSummary;