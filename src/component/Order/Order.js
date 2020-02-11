import React from 'react';
import classes from './Order.css';

const order=(props)=>{
    const ingredients=[];
    for(let ingredientsName in props.ingredients){
        ingredients.push({
            name :ingredientsName,
            amount: props.ingredients[ingredientsName]});
    }

    const ingredientsOutput=ingredients.map(ig=>{
        return<span
                style={{
                    textTransform:'captialize',
                    display:'inline-block',
                    margin:'0 8px',
                    padding:'5px',
                    border:'1px solid #ccc'
                }} 
                key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>Price <strong> Rs :{Number.parseFloat(props.price).toFixed(2)} </strong></p>
    </div>
    );
};
export default order;