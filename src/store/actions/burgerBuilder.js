import * as actionTypes from './actionTypes'
import axios from 'axios'

export const addIngredient = (ingName)=>{
    return {
        type: actionTypes.addIngredient,
        ingredientName: ingName
    }

}
 export const removeIngredient = (ingName)=>{
    return {
        type: actionTypes.removeIngredient,
        ingredientName: ingName
    }

}

export const setIngredients = (ingredients)=>{
    return {
        type: actionTypes.setIngredients,
        ingredients
    }
}
export const initIngredients = ()=>{
    return dispatch=>{
        axios.get('https://aburgerbuilder.firebaseio.com/ingredients.json')
        .then(res=>{
            dispatch(setIngredients(res.data))
        })  
    }
}