import * as acitonTypes from '../actions/actionTypes'


const initialState = {
    orders:[],
    loading:false,
    purchased: false
}
const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(acitonTypes.purchaseInit):
            return {
                ...state,
                purchased: false
            }
        case(acitonTypes.startingPurchase):
            return {
                ...state,
                loading:true
            }
        case(acitonTypes.purchaseOk):  
            const newOrder = {
                ...action.orderData,
                id:action.orderId
            } 
            return {
                ...state,
                purchased: true,
                loading:false,
                orders: state.orders.concat(newOrder)
            }
        case(acitonTypes.purchaseFail):
            return {
                purchased: false,
                loading: false,
                ...state
            }
        default:
            return state
    }
}

export default reducer