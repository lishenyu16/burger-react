import React, { Component } from 'react'
import axios from 'axios'
import Order from '../../components/Order/Order'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
class Orders extends Component{
    state={
        loading: true,
        orders:[]
    }
    componentDidMount(){
        
        axios.get('/orders.json')
            .then(res=>{
                const orders =[]
                for( let key in res.data){
                    orders.push({...res.data[key],id:key})
                }
                this.setState({orders: orders, loading:false})
            })
            .catch(err=>console.log(err))
    }
    render(){
        const orders =[]
        this.state.orders.forEach(element => {
            orders.push(<Order key={element.id} ingredients={element.ingredients} customer={element.customer}></Order>)
        });
        return (orders)
    }
}

const mapStateToProps = (state)=>{
    return {
        orders: state.orders.orders
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onInitOrdersHandler: ()=>dispatch(actions.fetchOrderInit)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders)