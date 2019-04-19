import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
class Orders extends Component{
    state={
        loading: true
    }
    componentDidMount(){      
        this.props.onInitOrdersHandler(this.props.userId, this.props.token)
    }
    render(){
        let orders=[]
        if(this.props.orders){
            this.props.orders.forEach(element => {
                orders.push(<Order key={element.id} price={element.price} ingredients={element.ingredients} customer={element.customer}></Order>)
            });
        }
        return (orders)
    }
}

const mapStateToProps = (state)=>{
    return {
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onInitOrdersHandler: (userId,token)=>dispatch(actions.fetchOrderInit(userId,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders)