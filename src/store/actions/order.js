import * as actionTypes from './actionTypes'
import axios from 'axios'

export const purchaseOK = (id,orderData)=>{
    return {
        type: actionTypes.purchaseOk,
        orderId: id,
        orderData
    }
}
export const purchaseFail = (error)=>{
    return {
        type: actionTypes.purchaseFail,
        error
    }
}

export const startingPurchase = ()=>{
    return {
        type: actionTypes.startingPurchase
    }
}
//async
export const purchaseStart = (orderData)=>{
    return (dispatch)=>{
        dispatch(startingPurchase())
        axios.post('/orders.json',orderData)
            .then(res=>{
                dispatch(purchaseOK(res.data,orderData))

                //this.props.history.push('/')
            })
            .catch(err=>{
                dispatch(purchaseFail(err))
            })
    }
}

export const purchaseInit = ()=>{
    return {
        type: actionTypes.purchaseInit

    }
}

export const  fetchOrders= (orders)=>{
    return {
        type: actionTypes.fetchOrders,
        orders
    }
}
export const fetchOrderInit = ()=>{
    return dispatch=>{
        axios.get('https://aburgerbuilder.firebaseio.com/orders.json')
        .then(res=>{
            const fetchedOrders =[]
            for(let key in res.data){
                const order ={
                    id:key,
                    ...res.data[key]
                }
                fetchedOrders.push(order)
            }
            dispatch(fetchOrders(fetchedOrders))
        })  
    }
}