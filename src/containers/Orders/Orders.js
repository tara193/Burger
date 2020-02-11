import React, {useEffect} from 'react';
import Order from '../../component/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index';
import Spinner from '../../component/UI/Spinner/Spinner';


const orders = (props) => {
    const {onOrderFetch,token, userId} = props;
    useEffect(()=>{
        onOrderFetch(token, userId);
    },[onOrderFetch,token, userId]);

    let order = <Spinner />;
    if (!props.loading) {
        order = props.orders.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price} />)
        )
    }
    return order;

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderFetch: (token, userId) => dispatch(actionCreators.orderFetch(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));