import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import styles from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop'
const sideDrawer = (props)=>{

    let attachedClasses = [styles.SideDrawer, styles.Close]
    if(props.show){
        attachedClasses = [styles.SideDrawer,styles.Open]
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clickBackdrop={props.sideDrawerClicked}></Backdrop>
            <div className={attachedClasses.join(' ')} onClick={props.sideDrawerClicked}>
                <Logo height='11%' />
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default sideDrawer