import React from 'react'
import NavItem from './NavItem'
import styles from './NavigationItems.module.css'

const navigationItems = (props)=>(
    <ul className={styles.NavigationItems}>
        <NavItem link="/">Burger Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
        <NavItem link="/auth">Authenticate</NavItem>
    </ul>
)

export default navigationItems