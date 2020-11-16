import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions'

const Signup = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line
    const [error, setError] = useState('')

    const user = useSelector((state) => state.user)
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const userSignup = (event) => {
        event.preventDefault()

        const user = {
            firstName,
            lastName,
            email,
            password,
        }

        dispatch(signup(user))
    }

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    if (user.loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <Container>
                {user.message}
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </Col>

                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </Col>
                            </Row>

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

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup
