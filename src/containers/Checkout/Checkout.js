
import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
import { connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
class Checkout extends Component{

    // componentWillMount(){
    //     this.props.onPurchaseInit()
    // }
    // componentDidMount(){
    //     if(this.props.purchased){
    //         this.props.history.replace('/')
    //     }
    // }

    checkoutCancelledHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinuedHandler=()=>{

        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        let burger = <Spinner />;
        let redirect = null
        if(this.props.ings){
            burger = <CheckoutSummary 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings}>
                    </CheckoutSummary>
        }
        if(this.props.purchased){
            redirect = <Redirect to="/" />
            //this.props.history.replace('/')
        }
        return(
            <div>
                {redirect}
                {burger}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}>
                </Route>
            </div>
        )
    }
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

export default connect(mapStateToProps)(Checkout)