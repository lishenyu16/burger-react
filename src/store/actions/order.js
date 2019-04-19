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
export const purchaseStart = (orderData,token)=>{
    return (dispatch)=>{
        dispatch(startingPurchase())
        axios.post('/orders.json?auth='+token,orderData)
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
export const fetchOrderInit = (userId,token)=>{
    return dispatch=>{
        const query = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"' 
        axios.get('/orders.json'+ query)
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
        .catch(err=>{
            console.log(err)
        }) 
    }
}