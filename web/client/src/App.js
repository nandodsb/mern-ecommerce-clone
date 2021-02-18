import React from 'react'
import './App.css'
import Homepage from './containers/HomePage'
import ProductListPage from './containers/ProductListPage'
import ProductDetailsPage from './containers/ProductDetailsPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions'

function App() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    React.useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn())
        }
    }, [auth.authenticate])

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact component={Homepage} />
                    <Route
                        path="/:productSlug/:productId/p"
                        component={ProductDetailsPage}
                    />
                    <Route path="/:slug" component={ProductListPage} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
