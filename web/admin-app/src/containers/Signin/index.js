import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../../components/Loader'

import './style.css'

const Signin = (props) => {
    //ANCHOR States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line
    const [error, setError] = useState('')
    const auth = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    //ANCHOR userLogin
    const userLogin = (event) => {
        event.preventDefault()

        const user = {
            email,
            password,
        }

        dispatch(login(user))
    } //End function

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    if (auth.authenticating) {
        return <Loader />
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px', paddingTop: '60px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signin
