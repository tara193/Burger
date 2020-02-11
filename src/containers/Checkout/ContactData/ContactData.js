import React, { useState } from 'react';
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreator from '../../../store/action/index';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updatedObject, checkValidity } from '../../../shared/utility'



const contactData = (props) => {
    const [orderForm, setOrderFrom] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    });
    const [formIsValid, setFormIsValida] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formDataIdentifier in orderForm) {
            formData[formDataIdentifier] = orderForm[formDataIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        props.onBurgerPurchaseStart(order, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value)

        const updatedFormElement = updatedObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updatedObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let elementIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[elementIdentifier].valid && formIsValid;
        }
        setOrderFrom(updatedOrderForm);
        setFormIsValida(formIsValid);

    }

    const formElementArray = [];
    for (let key in orderForm) {
        formElementArray.push(
            {
                id: key,
                config: orderForm[key]
            });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementArray.map(formElement => (
                <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
                // changed={this.inputChangedHandler}/>
            ))}
            <Button btntype="Success" disabled={!formIsValid}> ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = (<Spinner />)
    }
    return (
        <div className={classes.ContactData}>
            <h4>Contact Data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerPurchaseStart: (orderData, token) => dispatch(actionCreator.burgerPurchase(orderData, token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));