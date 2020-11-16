import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/Hoc/PrivateRoute'
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions'

function App() {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    //
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn())
        }
    }, [])

    return (
        <div className="App">
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </div>
    )
}

export default App
