import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/Hoc/PrivateRoute'
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
