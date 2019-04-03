import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat:1.5,
  cheese: 0.35,
  bacon: 0.98
}

class BurgerBuilder extends Component {

  state={
    ingredients:{
      salad:0,
      meat:0,
      cheese:0,
      bacon:0
    },
    totalPrice: 4,
    purchasing: false
  }

  addIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount+1
    const newIngredients = {...this.state.ingredients}
    newIngredients[type] = updatedCount

    const typePrice = INGREDIENT_PRICES[type]
    const newPrice = this.state.totalPrice + typePrice

    console.log('added ingredient')

    this.setState({ingredients: newIngredients, totalPrice: newPrice})
  }
  removeIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type]
    if(oldCount<=0){
      return
    }
    const updatedCount = oldCount-1
    const newIngredients = {...this.state.ingredients}
    newIngredients[type] = updatedCount

    const typePrice = INGREDIENT_PRICES[type]
    const newPrice = this.state.totalPrice - typePrice
    console.log('removed ingredient')

    this.setState({ingredients: newIngredients, totalPrice: newPrice})
  }

  purchasingHandler=()=>{
    this.setState({purchasing:true})
  }
  purchasingCancelHandler=()=>{
    this.setState({purchasing:false})
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<=0
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls 
          clickPurchase={this.purchasingHandler}
          price={this.state.totalPrice}
          disabled = {disabledInfo}
          ingredientAdded = {this.addIngredientHandler} 
          ingredientRemoved = {this.removeIngredientHandler} />

      </React.Fragment>

    );
  }
}

export default BurgerBuilder;
