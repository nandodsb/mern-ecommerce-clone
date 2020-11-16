import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Layout from '../../components/Layout'
import './style.css'

const Home = (props) => {
    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">
                        Side bar
                    </Col>
                    <Col md={10} style={{ marginLeft: 'auto' }}>
                        Container
                    </Col>
                </Row>
            </Container>
            {/*<Jumbotron
                style={{ margin: '5rem', background: '#FFF' }}
                className="text-center"
            >
                <h1>Welcome to Admin Dashboard</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque vehicula purus vitae suscipit hendrerit. Mauris
                    odio augue, efficitur non interdum nec, auctor a nibh.
                    Phasellus dui orci, porttitor eget urna eu, faucibus dictum
                    nulla. Suspendisse odio purus, maximus vitae laoreet a,
                    malesuada eget purus. Donec fermentum pretium sem a rhoncus.
                    Vestibulum volutpat, nisi in viverra imperdiet, mi velit
                    euismod mauris, ac condimentum mauris purus a mi. In blandit
                    metus ut nisl euismod facilisis. Vivamus id feugiat justo.
                    Mauris vel ex ut magna pulvinar efficitur. Vestibulum rutrum
                    lacinia condimentum. Donec vitae augue semper, vehicula ex
                    ac, eleifend velit. Vestibulum auctor ultrices nisi, non
                    vestibulum metus sagittis et. Praesent sed rutrum ligula, id
                    ultricies metus. Donec tincidunt odio eget nulla luctus
                    congue. Suspendisse eget vulputate sem.
                </p>
            </Jumbotron>*/}
        </Layout>
    )
}

export default Home
