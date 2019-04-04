import React from 'react'
import NavItem from './NavItem'
import styles from './NavigationItems.module.css'

const navigationItems = (props)=>(
    <ul className={styles.NavigationItems}>
        <NavItem active link="/">Burger Builder</NavItem>
        <NavItem>Check Out</NavItem>
    </ul>
)

export default navigationItems