import React from 'react'
import styles from './Order.module.css'
const Order = (props)=>{
    const ingredients = props.ingredients
    const customer = props.customer
    const price = props.price
    return(
        <div className={styles.Order}>
            <h3>Hi, {customer.name} !</h3>
            <p>This is your order: </p>
            <p>Total price is: {price}</p>
            <ul>
                <li>Bacon: {ingredients.bacon}</li>
                <li>Meat: {ingredients.meat}</li>
                <li>Cheese: {ingredients.cheese}</li>
                <li>Salad: {ingredients.salad}</li>
            </ul>
            <h3>About the customer:</h3>
            <ul>
                <li>Email: {customer.email}</li>
                <li>Address: {customer.street}</li>
                <li>Delivery type: {customer.deliveryMethod}</li>
            </ul>
        </div>
    )
}

export default Order