import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients:null,//{bacon:1,meat:1,salad:1,cheese:1},
    totalPrice: 4,
    buildingBurger: false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    meat:1.5,
    cheese: 0.35,
    bacon: 0.85
  }

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(actionTypes.addIngredient):
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                },
                buildingBurger:true,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case(actionTypes.removeIngredient):
            let buildingBurger = true
            if(state.totalPrice - INGREDIENT_PRICES[action.ingredientName]===4){
                buildingBurger = false
            }
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                },
                buildingBurger,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case(actionTypes.setIngredients):
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                buildingBurger:false
                //totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state
    }
}

export default reducer