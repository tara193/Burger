import React from 'react';
import burgerLogo from '../../assest/image/burger-logo.png';
import classes from './Logo.css'

const logo=(props)=>(
    <div className={classes.Logo}>
    <img src={burgerLogo} alt="My Burger"/>
    </div>

);
export default logo;