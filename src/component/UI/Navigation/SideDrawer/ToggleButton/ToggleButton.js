import React from 'react';
import classes from './ToggleButton.css';
const toggelButton =(props)=>(
    <div className= {classes.ToggleButton} onClick={props.click}>
        <div></div>
        <div></div>
        <div></div>

    </div>
    // <button className= {classes.ToggleButton} onClick={props.click}>Menu</button>

);
export default toggelButton;