import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../../components/Layout'

const Home = (props) => {
    return (
        <>
            <Layout>
                <Jumbotron>
                    <h1>Welcome to Admin Dashboard</h1>
                </Jumbotron>
            </Layout>
        </>
    )
}

export default Home
