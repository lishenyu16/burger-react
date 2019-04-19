import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Logout from './containers/Auth/Logout'
import {Route, Switch, Redirect} from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import {connect} from 'react-redux'

class App extends Component {
  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Redirect to='/' />
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

 const mapStateToProps = state=>{
   return {
     isAuthenticated: state.auth.isLoggedIn
   }
 }
export default connect(mapStateToProps)(App)
