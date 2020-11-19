import React, { useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'

import './style.css'

const Products = (props) => {
    const dispatch = useDispatch()
    //ANCHOR React States
    const [show, setShow] = useState(false)
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setProductPictures] = useState([])
    const category = useSelector((state) => state.category)
    const product = useSelector((state) => state.product)

    const handleClose = () => {
        const form = new FormData()

        form.append('name', name)
        form.append('quantity', quantity)
        form.append('price', price)
        form.append('description', description)
        form.append('category', categoryId)

        for (let pic of productPictures) {
            form.append('productPicture', pic)
        }

        dispatch(addProduct(form))

        setShow(false)
    }

    const handleShow = () => setShow(true)

    /*ANCHOR */
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    /*ANCHOR */
    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]])
    }

    console.log(productPictures)

    /*ANCHOR */
    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>

                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0
                        ? product.products.map((product) => (
                              <tr
                                  onClick={() =>
                                      showProductDetailModal(product)
                                  }
                                  key={product._id}
                              >
                                  <td>#</td>
                                  <td>{product.name}</td>
                                  <td>{product.price}</td>
                                  <td>{product.quantity}</td>

                                  <td>--</td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </Table>
        )
    }

    /*ANCHOR */
    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Product'}
            >
                <Input
                    value={name}
                    placeholder={`Product Name`}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    value={quantity}
                    placeholder={`Quantity`}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <Input
                    value={price}
                    placeholder={`Price`}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <Input
                    value={description}
                    placeholder={`Description`}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/*<Input
                        label="Category"
                        value={categoryId}
                        placeholder={`Category`}
                        onChange={(e) => setCategoryId(e.target.value)}
                    />*/}

                <select
                    value={categoryId}
                    className="form-control"
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Select Category</option>3
                    {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <br />

                {productPictures.length > 0
                    ? productPictures.map((pic, index) => (
                          <div key={index}>{pic.name}</div>
                      ))
                    : null}

                <Input
                    type="file"
                    name={productPictures}
                    onChange={handleProductPictures}
                />
            </Modal>
        )
    }

    const handleCloseDetailsModal = () => {
        setProductDetailModal(false)
    }

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null
        }

        return (
            <Modal
                show={productDetailModal}
                handleClose={handleCloseDetailsModal}
                modalTitle={`Product Details`}
                size="lg"
            >
                <Row>
                    <Col md={6}>
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                </Row>
            </Modal>
        )
    }

    const showProductDetailModal = (product) => {
        setProductDetails(product)
        setProductDetailModal(true)
        console.log(product)
    }

    return (
        <Layout sidebar>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <h3>Product</h3>
                            <Button variant="dark" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>{renderProducts()}</Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailsModal()}
        </Layout>
    )
}

export default Products
