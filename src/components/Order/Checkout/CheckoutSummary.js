import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button'
import styles from './CheckoutSummary.module.css'
const checkoutSummary = (props)=>{
    return (
        <div className={styles.CheckoutSummary}>
            <h1>we hope it's like shit!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary