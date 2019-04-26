import React, { useState} from 'react'
import Button from '../../../components/UI/Button'
import styles from './ContactData.module.css'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'

const contactData = (props)=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [street,setStreet] = useState('')
    const [zip,setZip] = useState('')
    const [deliveryMethod,setDeliveryMethod] = useState('fastest')
    // state={
    //     name:'',
    //     email:'',
    //     street:'',
    //     zip:'',
    //     deliveryMethod:'fastest',
    //     loading:false
    // }
    const orderHandler=(event)=>{
        event.preventDefault()
        const order = {
            ingredients:props.ings,
            price:props.price,
            customer:{
                name,
                street,
                zip,  
                email,
                deliveryMethod
            },
            userId: props.userId
        }
        props.onOrderHandler(order, props.token)
    }
    const changedHandler=(event,inputId)=>{
        //another way: deep copy of the state, then replace state as a whole object.
        
        // handleUserInput (e) {
        //     const name = e.target.name;
        //     const value = e.target.value;
        //     this.setState({[name]: value});
        // }
        //------------------------------------------------------
        if(inputId==='name'){
            //this.setState({name:event.target.value})
            setName(event.target.value)
        }
        if(inputId==='email'){
            //this.setState({email:event.target.value})
            setEmail(event.target.value)
        }
        if(inputId==='street'){
            //this.setState({street:event.target.value})
            setStreet(event.target.value)
        }
        if(inputId==='zip'){
            //this.setState({zip:event.target.value})
            setZip(event.target.value)
        }
        if(inputId==='deliveryMethod'){
            //this.setState({deliveryMethod:event.target.value})
            setDeliveryMethod(event.target.value)
        }


    }
    return (
        <div className={styles.ContactData}>
            <h4>Enter your personal info: </h4>
            <form onSubmit={orderHandler}>
                <Input inputtype='input' type="text" name='name' label="Your Name" required={true} changed={(event)=>{changedHandler(event,'name')}} value={name}></Input>
                <Input inputtype='input' type="email" name='email' label="Email" required={true} changed={(event)=>{changedHandler(event,'email')}}  value={email}></Input>
                <Input inputtype='input' type="text" name='street' label='Street' required={true} changed={(event)=>{changedHandler(event,'street')}}   value={street}></Input>
                <Input inputtype='input' type="text" name='zip' label='Zip Code' required={true} changed={(event)=>{changedHandler(event,'zip')}} value={zip}></Input>
                <Input 
                    inputtype='select' 
                    name='deliveryMethod' 
                    label='Delivery Method' 
                    options={[{value:'fastest', displayValue:'Fastest'},{value:'cheapest', displayValue:'Cheapest'}]}
                    changed={(event)=>{changedHandler(event,'deliveryMethod')}}
                    value={deliveryMethod}></Input>
                <Button btnType="Success">Order</Button>
            </form>
        </div>
    )

}

const mapStateToProps = (state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchtoProps = (dispatch)=>{
    return {
        onOrderHandler: (orderData,token)=>dispatch(actions.purchaseStart(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(contactData) 