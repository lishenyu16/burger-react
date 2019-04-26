
import React from 'react'
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
import { connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'


const checkout = (props)=>{

    const checkoutCancelledHandler=()=>{
        props.history.goBack()
    }
    const checkoutContinuedHandler=()=>{

        props.history.replace('/checkout/contact-data')
    }

    let burger = <Spinner />;
    let redirect = null
    if(props.ings){
        burger = <CheckoutSummary 
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={props.ings}>
                </CheckoutSummary>
    }
    if(props.purchased){
        redirect = <Redirect to="/" />
        //this.props.history.replace('/')
    }
    return(
        <div>
            {redirect}
            {burger}
            <Route 
                path={props.match.path + '/contact-data'} 
                component={ContactData}>
            </Route>
        </div>
    )

}

const mapStateToProps=(state)=>{
    return {
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }

}

// const mapDispatchToProps = (dispatch)=>{
//     return {
//         onPurchaseInit: ()=>dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(checkout)