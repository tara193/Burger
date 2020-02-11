import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls =[
    {label:'Salad' ,type:'salad'},
    {label:'Bacon' ,type:'bacon'},
    {label:'Meat' ,type:'meat'},
    {label:'Cheese' ,type:'cheese'}
];

const buildControls =(props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrls=>(
            <BuildControl key={ctrls.label} label={ctrls.label} 
            added={()=>props.ingredientsAdded(ctrls.type)}
            removed={()=>props.ingredientsRemoved(ctrls.type)}
            disabled={props.disabled[ctrls.type]}
            />
        ))}
        <button className={classes.OrderButton}
        onClick={props.ordered}
        disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO CONTINUE'}</button>
        
    </div>
);
export default buildControls;