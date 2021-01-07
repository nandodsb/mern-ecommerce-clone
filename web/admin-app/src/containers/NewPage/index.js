import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal'
import Input from '../../components/UI/Input'
import Layout from '../../components/Layout'
import { Row, Col, Container } from 'react-bootstrap'
import linearCategories from '../../helpers/linearCategories'
import { useSelector, useDispatch } from 'react-redux'
import { createPage } from '../../actions'

function NewPage(props) {
    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState([])
    const [desc, setDesc] = useState('')
    const [type, setType] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])

    const category = useSelector((state) => state.category)
    const page = useSelector((state) => state.page)
    const dispatch = useDispatch()

    useEffect(() => {
        //console.log('category', category)
        setCategories(linearCategories(category.categories))
    }, [category])

    useEffect(() => {
        console.log('page', page)
        if (!page.loading) {
            setCreateModal(false)
        }
    }, [page])

    //console.log('categories', categories)

    const onCategoryChange = (e) => {
        const category = categories.find(
            (category) => category._id == e.target.value
        )
        setCategoryId(e.target.value)
        setType(category.type)
    }

    const handleBannerImages = (e) => {
        console.log(e)
        setBanners([...banners, e.target.files[0]])
    }

    const handleProductImages = (e) => {
        console.log(e)
        setProducts([...products, e.target.files[0]])
    }

    const submitPageForm = (e) => {
        //e.target.preventDefault()

        if (title === '') {
            alert('Title is required')
            setCreateModal(false)
            return
        }

        const form = new FormData()

        form.append('title', title)
        form.append('description', desc)
        form.append('category', categoryId)
        form.append('type', type)

        banners.forEach((banner, index) => {
            form.append('banners', banner)
        })

        products.forEach((product, index) => {
            form.append('products', product)
        })

        dispatch(createPage(form))

        //console.log({ title, desc, categoryId, type, banners, products })
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={`Create New Modal`}
                handleClose={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">select category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat._id}>
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

                    {banners.length > 0
                        ? banners.map((banner, index) => (
                              <Row key={index}>
                                  <Col>{banner.name}</Col>
                              </Row>
                          ))
                        : null}
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

                    {products.length > 0
                        ? products.map((product, index) => (
                              <Row key={index}>
                                  <Col>{product.name}</Col>
                              </Row>
                          ))
                        : null}
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
