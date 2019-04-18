import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'  //here the last index can be omitted as it will auto find it.


class BurgerBuilder extends Component {

  state={
    purchasing: false,
    loading:false
  }

  purchasingHandler=()=>{
    if(this.props.isLoggedIn){
      this.setState({purchasing:true})
    }
    else{
      this.props.history.push('/auth')
    }
    
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
    this.props.checkAuthState()
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

    if ( this.props.ings ) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            isLoggedIn={this.props.isLoggedIn}
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

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);
