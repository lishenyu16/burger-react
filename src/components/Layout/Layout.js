import React ,{Component} from 'react'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        showSideDrawer : true
    }

    sideDrawerClosed= ()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler=()=>{
        this.setState((preState)=>{
            return {showSideDrawer : !preState.showSideDrawer}
        })
    }

    render(){
        return(
            <React.Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
                <SideDrawer show={this.state.showSideDrawer} sideDrawerClicked={this.sideDrawerClosed}></SideDrawer>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }

}

export default Layout
