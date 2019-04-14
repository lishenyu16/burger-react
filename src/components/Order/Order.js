import React from 'react'
import styles from './Order.module.css'
const Order = (props)=>{
    const ingredients = props.ingredients
    const customer = props.customer
    return(
        <div className={styles.Order}>
            <h3>Hi, {customer.name} !</h3>
            <p>This is your order: </p>
            <ul>
                <li>Bacon: {ingredients.bacon}</li>
                <li>Meat: {ingredients.meat}</li>
                <li>Cheese: {ingredients.cheese}</li>
                <li>Salad: {ingredients.salad}</li>
            </ul>
        </div>
    )
}

export default Order