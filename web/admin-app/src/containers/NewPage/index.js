import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal'
import Input from '../../components/UI/Input'
import Layout from '../../components/Layout'
import { Row, Col, Container } from 'react-bootstrap'
import linearCategories from '../../helpers/linearCategories'
import { useSelector } from 'react-redux'

function NewPage(props) {
    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState([])
    const [desc, setDesc] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])

    const category = useSelector((state) => state.category)

    useEffect(() => {
        //console.log('category', category)
        setCategories(linearCategories(category.categories))
    }, [category])

    //console.log('categories', categories)

    const handleBannerImages = (e) => {
        console.log(e)
    }

    const handleProductImages = (e) => {
        console.log(e)
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={`Create New Modal`}
                handleClose={() => setCreateModal(false)}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">select category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Desc'}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create</button>
        </Layout>
    )
}

export default NewPage
