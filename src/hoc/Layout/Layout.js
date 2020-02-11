import React, { useState } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../component/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/UI/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }
    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }
    return (
        <Auxiliary>
            <Toolbar
                isAuth={props.isAuthenticated}
                openDrawer={sideDrawerOpenHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}> {props.children} </main>
        </Auxiliary>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(layout);