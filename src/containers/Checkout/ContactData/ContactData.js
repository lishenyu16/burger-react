import React, { Component } from 'react'
import Button from '../../../components/UI/Button'
import styles from './ContactData.module.css'
import axios from 'axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'

class ContactData extends Component{
    state={
        name:'',
        email:'',
        street:'',
        zip:'',
        deliveryMethod:'fastest',
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault()
        const order = {
            ingredients:this.props.ings,
            price:this.props.price,
            customer:{
                name:this.state.name,
                street:this.state.street,
                zip:this.state.zip,  
                email:this.state.email,
                deliveryMethod: this.state.deliveryMethod
            }
        }
        this.props.onOrderHandler(order,this.props.token)
    }
    changedHandler=(event,inputId)=>{
        //another way: deep copy of the state, then replace state as a whole object.
        
        // handleUserInput (e) {
        //     const name = e.target.name;
        //     const value = e.target.value;
        //     this.setState({[name]: value});
        // }
        if(inputId==='name'){
            this.setState({name:event.target.value})
        }
        if(inputId==='email'){
            this.setState({email:event.target.value})
        }
        if(inputId==='street'){
            this.setState({street:event.target.value})
        }
        if(inputId==='zip'){
            this.setState({zip:event.target.value})
        }
        if(inputId==='deliveryMethod'){
            this.setState({deliveryMethod:event.target.value})
        }
    }
    render(){
        return (
            <div className={styles.ContactData}>
                <h4>Enter your personal info: </h4>
                <form onSubmit={this.orderHandler}>
                    <Input inputtype='input' type="text" name='name' label="Your Name" required={true} changed={(event)=>{this.changedHandler(event,'name')}} value={this.state.name}></Input>
                    <Input inputtype='input' type="email" name='email' label="Email" required={true} changed={(event)=>{this.changedHandler(event,'email')}}  value={this.state.email}></Input>
                    <Input inputtype='input' type="text" name='street' label='Street' required={true} changed={(event)=>{this.changedHandler(event,'street')}}   value={this.state.street}></Input>
                    <Input inputtype='input' type="text" name='zip' label='Zip Code' required={true} changed={(event)=>{this.changedHandler(event,'zip')}} value={this.state.zip}></Input>
                    <Input 
                        inputtype='select' 
                        name='deliveryMethod' 
                        label='Delivery Method' 
                        options={[{value:'fastest', displayValue:'Fastest'},{value:'cheapest', displayValue:'Cheapest'}]}
                        changed={(event)=>{this.changedHandler(event,'deliveryMethod')}}
                        value={this.state.deliveryMethod}></Input>
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
}
const mapDispatchtoProps = (dispatch)=>{
    return {
        onOrderHandler: (orderData,token)=>dispatch(actions.purchaseStart(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(ContactData)  