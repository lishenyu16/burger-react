import React from 'react'
import styles from './NavItem.module.css'
import {NavLink} from 'react-router-dom'
const navItem = (props)=>(
    <li className={styles.NavItem}>
        <NavLink 
            exact
            activeClassName={styles.active}
            to={props.link}>{props.children}</NavLink>
    </li>
)

export default navItem