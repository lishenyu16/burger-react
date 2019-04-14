import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
// import axios from 'axios'
// import Layout from '../../components/Layout/Layout';
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'  //here the last index can be omitted as it will auto find it.


class BurgerBuilder extends Component {

  state={
    purchasing: false,
    loading:false
  }

  // addIngredientHandler = (type)=>{
  //   const oldCount = this.state.ingredients[type]
  //   const updatedCount = oldCount+1
  //   const newIngredients = {...this.state.ingredients}
  //   newIngredients[type] = updatedCount

  //   const typePrice = INGREDIENT_PRICES[type]
  //   const newPrice = this.state.totalPrice + typePrice

  //   console.log('added ingredient')

  //   this.setState({ingredients: newIngredients, totalPrice: newPrice})
  // }
  // removeIngredientHandler = (type)=>{
  //   const oldCount = this.state.ingredients[type]
  //   if(oldCount<=0){
  //     return
  //   }
  //   const updatedCount = oldCount-1
  //   const newIngredients = {...this.state.ingredients}
  //   newIngredients[type] = updatedCount

  //   const typePrice = INGREDIENT_PRICES[type]
  //   const newPrice = this.state.totalPrice - typePrice
  //   console.log('removed ingredient')

  //   this.setState({ingredients: newIngredients, totalPrice: newPrice})
  // }

  purchasingHandler=()=>{
    this.setState({purchasing:true})
  }
  purchasingCancelHandler=()=>{
    this.setState({purchasing:false})
  }
  purchasingContinueHandler=()=>{
    this.props.onPurchaseInit()
    this.props.history.push('/checkout')
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
  
  componentDidMount(){
    this.props.initIngredientsHandler()
  }

  render() {   
    const disabledInfo = {
      ...this.props.ings
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<=0
    }
    let orderSummary = null;
    let burger = <Spinner />;

    // let orderSummary = <OrderSummary 
    //   totalPrice={this.props.price}
    //   purchaseCancel={this.purchasingCancelHandler}
    //   purchaseContinue={this.purchasingContinueHandler}
    //   ingredients={this.props.ings} />

    // if(this.state.loading){
    //   orderSummary= <Spinner></Spinner>
    // }
    if ( this.props.ings ) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            clickPurchase={this.purchasingHandler}
            price={this.props.price}
            disabled = {disabledInfo}
            ingredientAdded = {this.props.addIngredientHandler} 
            ingredientRemoved = {this.props.removeIngredientHandler} />
        </React.Fragment>
      );
      orderSummary = <OrderSummary 
        totalPrice={this.props.price}
        purchaseCancel={this.purchasingCancelHandler}
        purchaseContinue={this.purchasingContinueHandler}
        ingredients={this.props.ings} />
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>

    );
  }
}

const mapDispatchToProps=(dispatch)=>{
    return {
      //onIncrementCounter:()=> dispatch({type: 'incrementCounter'}),
      addIngredientHandler: (name)=> dispatch(actions.addIngredient(name)),
      removeIngredientHandler: (name)=> dispatch(actions.removeIngredient(name)),
      initIngredientsHandler: ()=> dispatch(actions.initIngredients()) ,
      onPurchaseInit: ()=>dispatch(actions.purchaseInit())
    }
}

const mapStateToProps=(state)=>{
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);
