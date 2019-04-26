import React ,{useState} from 'react'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'



const layout = (props)=>{
    const [showSideDrawer,setShowSideDrawer] = useState(false)
    // state={
    //     showSideDrawer : false
    // }

    const sideDrawerClosed= ()=>{
        setShowSideDrawer(false)
        //this.setState({showSideDrawer:false})
    }

    const sideDrawerToggleHandler=()=>{
        setShowSideDrawer(!showSideDrawer)
        // this.setState((preState)=>{
        //     return {showSideDrawer : !preState.showSideDrawer}
        // })
    }

    return(
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler}></Toolbar>
            <SideDrawer show={showSideDrawer} sideDrawerClicked={sideDrawerClosed}></SideDrawer>
            <main className={styles.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )

}

export default layout
