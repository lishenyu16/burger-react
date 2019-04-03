import React from 'react'
import Button from '../../UI/Button'
const orderSummary = (props)=>{

    const ingredientKeys = Object.keys(props.ingredients)
    const listArr= []
    ingredientKeys.forEach(item=>{listArr.push(<li key={item + item}>{item} : {props.ingredients[item]}</li>)})
    return (
        <>
            <h3>Your Order</h3>
            <p>This is a burger you made worth: <strong>${props.totalPrice}</strong></p>
            <ul>
                {listArr}
            </ul>
            <p>Continue to Check Out?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </>
    )
}
export default orderSummary