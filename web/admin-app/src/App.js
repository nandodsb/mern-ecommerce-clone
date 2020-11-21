import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/Hoc/PrivateRoute'
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import Products from './containers/Products'
import Orders from './containers/Orders'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, getInitialData } from './actions'
import Category from './containers/Category'

function App() {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    //
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn())
        }

        dispatch(getInitialData())
    }, [])

    return (
        <div className="App">
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
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
