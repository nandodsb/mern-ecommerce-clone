import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

// import { Container } from './styles';

const Products = (props) => {
    const dispatch = useDispatch()
    //ANCHOR React States
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setProductPictures] = useState([])
    const category = useSelector((state) => state.category)

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
                            <Button variant="primary" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        {createCategoryList(category.categories).map(
                            (option) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            )
                        )}
                    </select>

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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Products
