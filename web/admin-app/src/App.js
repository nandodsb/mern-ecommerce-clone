import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/Hoc/PrivateRoute'
import Home from './containers/Home'
import Page from './containers/NewPage'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import Products from './containers/Products'
import Orders from './containers/Orders'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, getInitialData } from './actions'
import Category from './containers/Category'

function App() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    //
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn())
        }
        if (auth.authenticate) {
            dispatch(getInitialData())
        }
    }, [auth.authenticate])

    return (
        <div className="App">
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/page" component={Page} />
                <PrivateRoute path="/category" component={Category} />
                <PrivateRoute path="/products" component={Products} />
                <PrivateRoute path="/orders" component={Orders} />
                {/** */}
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </div>
    )
}

export default App
