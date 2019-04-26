import React from 'react'
import NavItem from './NavItem'
import styles from './NavigationItems.module.css'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'

const navigationItems = (props)=>{

    let authMethod = <NavItem link="/auth">Sign In</NavItem>
    let ordersLink = null
    if(props.isLoggedIn){
        ordersLink = <NavItem link="/orders">Orders</NavItem>
        authMethod = <NavItem link="/logout">Logout</NavItem> // <button onClick={this.props.onLogout}>Logout</button>
    }
    return (
        <ul className={styles.NavigationItems}>
            <NavItem link="/">Burger Builder</NavItem>
            {ordersLink}
            {authMethod}
        </ul>
    )
}

const mapStateToProps = (state)=>{
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onLogout:()=> dispatch(actions.logout())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(navigationItems)
