import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component{
    state={
        loading: true
    }
    componentDidMount(){      
        this.props.onInitOrdersHandler()
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
        orders: state.order.orders
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onInitOrdersHandler: ()=>dispatch(actions.fetchOrderInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders)