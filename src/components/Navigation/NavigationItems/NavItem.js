import React from 'react'
import styles from './NavItem.module.css'
const navItem = (props)=>(
    <li className={styles.NavItem}>
        <a className={props.active?styles.active:null} href={props.link}>{props.children}</a>
    </li>
)

export default navItem