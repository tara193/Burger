import React from 'react';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const checkout = (props) => {

    const cancelCheckoutHandler = () => {
        props.history.goBack();
    }
    const continueCheckoutHandler = () => {
        props.history.replace('/checkout/customer-data');
    }

    let summary = <Redirect to="/" />
    if (props.ings) {
        const purchasedRedirect = props.purchased ? < Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    continueCheckout={continueCheckoutHandler}
                    cancelCheckout={cancelCheckoutHandler} />
                <Route
                    path={props.match.path + '/customer-data'}
                    component={ContactData} />
            </div>
        );
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);