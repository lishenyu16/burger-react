import React, { useState,useEffect } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'  //here the last index can be omitted as it will auto find it.


const burgerBuilder = (props)=>{
  const [purchasing,setPurchasing] = useState(false)

  // state={
  //   purchasing: false,
  //   loading:false
  // }

  const purchasingHandler=()=>{
    if(props.isLoggedIn){
      //this.setState({purchasing:true})
      setPurchasing(true)
    }
    else{
      props.history.push('/auth')
    }
    
  }
  const purchasingCancelHandler=()=>{
    //this.setState({purchasing:false})
    setPurchasing(false)
  }
  const purchasingContinueHandler=()=>{
    props.onPurchaseInit()
    props.history.push('/checkout')
    // const queryParams = []
    // for(let i in this.state.ingredients){ //i here refers to key in object
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // const queryString = queryParams.join('&')
    // this.props.history.push({
    //   pathname:'/checkout',
    //   search: "?" + queryString
    // })

  }
  useEffect(()=>{
    props.initIngredientsHandler()
    props.checkAuthState()
  },[])

    const disabledInfo = {
      ...props.ings
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<=0
    }
    let orderSummary = null;
    let burger = <Spinner />;

    if ( props.ings ) {
      burger = (
        <React.Fragment>
          <Burger ingredients={props.ings} />
          <BuildControls 
            isLoggedIn={props.isLoggedIn}
            clickPurchase={purchasingHandler}
            price={props.price}
            disabled = {disabledInfo}
            ingredientAdded = {props.addIngredientHandler} 
            ingredientRemoved = {props.removeIngredientHandler} />
        </React.Fragment>
      );
      orderSummary = <OrderSummary 
        totalPrice={props.price}
        purchaseCancel={purchasingCancelHandler}
        purchaseContinue={purchasingContinueHandler}
        ingredients={props.ings} />
    }

    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>

    );

}

const mapDispatchToProps=(dispatch)=>{
    return {
      //onIncrementCounter:()=> dispatch({type: 'incrementCounter'}),
      addIngredientHandler: (name)=> dispatch(actions.addIngredient(name)),
      removeIngredientHandler: (name)=> dispatch(actions.removeIngredient(name)),
      initIngredientsHandler: ()=> dispatch(actions.initIngredients()) ,
      onPurchaseInit: ()=>dispatch(actions.purchaseInit()),
      checkAuthState: ()=>dispatch(actions.checkAuthState())
    }
}

const mapStateToProps=(state)=>{
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      isLoggedIn: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(burgerBuilder);
