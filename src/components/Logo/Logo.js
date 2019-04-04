import React from 'react'
import styles from './Logo.module.css'
import burgerLogo from '../../assets/Images/burger-logo.png'

const logo = (props)=>(
    <div className={styles.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt="My Burger"></img>
    </div>
)

export default logo