import React from 'react'

const orderSummary = (props)=>{

    const ingredientKeys = Object.keys(props.ingredients)
    const listArr= []
    ingredientKeys.forEach(item=>{listArr.push(<li key={item + item}>{item} : {props.ingredients[item]}</li>)})
    return (
        <>
            <h3>Your Order</h3>
            <p>This is a burger you made !</p>
            <ul>
                {listArr}
            </ul>
            <p>Continue to Check Out?</p>
        </>
    )
}
export default orderSummary