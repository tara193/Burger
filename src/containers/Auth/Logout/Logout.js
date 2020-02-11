import React, { useEffect } from 'react';
import * as actionCreator from '../../../store/action/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const logout = props => {
    useEffect(() => {
        props.onLogout();
    }, []);

    return (
        <Redirect to="/"></Redirect>
    );
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreator.authLogout())
    };
};

export default connect(null, mapDispatchToProps)(logout);