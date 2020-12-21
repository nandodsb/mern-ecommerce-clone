import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, updateCategories } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import CheckboxTree from 'react-checkbox-tree'
import {
    IoIosSquareOutline,
    IoIosCheckbox,
    IoIosArrowDown,
    IoIosArrowForward,
} from 'react-icons/io'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

// import { Container } from './styles';

const Category = (props) => {
    //NOTE React States
    const [show, setShow] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)

    const category = useSelector((state) => state.category)
    const dispatch = useDispatch()

    const handleClose = () => {
        const form = new FormData()

        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        dispatch(addCategory(form))
        setCategoryName('')
        setParentCategoryId('')

        /*const cat = {
            categoryName,
            parentCategoryId,
            handleCategoryImage,
        }*/

        //console.log(cat)
        setShow(false)
    }
    const handleShow = () => setShow(true)

    const renderCategories = (categories) => {
        let myCategories = []

        for (let category of categories) {
            myCategories.push({
                label: category.name,
                value: category._id,
                children:
                    category.children.length > 0 &&
                    renderCategories(category.children),
            })
        }
        return myCategories
    }

    /*NOTE */
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    /*NOTE  */
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    /*NOTE  */
    const updateCategory = () => {
        setUpdateCategoryModal(true)
        const categories = createCategoryList(category.categories)

        const checkedArray = []
        const expandedArray = []

        checked.length > 0 &&
            checked.forEach((categoryId, _index) => {
                const category = categories.find(
                    (category, i) => categoryId == category.value
                )
                category && checkedArray.push(category)
            })

        expanded.length > 0 &&
            expanded.forEach((categoryId, _index) => {
                const category = categories.find(
                    (category, _index) => categoryId == category.value
                )
                category && expandedArray.push(category)
            })

        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)

        console.log({
            checked,
            expanded,
            categories,
            checkedArray,
            expandedArray,
        })
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map(
                (item, _index) => (index) =>
                    _index ? { ...item, [key]: value } : item
            )
            setCheckedArray(updatedCheckedArray)
        } else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map(
                (item, _index) => (index) =>
                    _index ? { ...item, [key]: value } : item
            )
            setExpandedArray(updatedExpandedArray)
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData()

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : '')
        })

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : '')
        })

        dispatch(updateCategories(form))

        setUpdateCategoryModal(false)
    }

    const renderUpdateCategoriesModal = () => (
        <Modal
            show={updateCategoryModal}
            handleClose={updateCategoriesForm}
            modalTitle={'Update Categories'}
            size="lg"
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {expandedArray.length > 0 &&
                expandedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        'name',
                                        e.target.value,
                                        index,
                                        'expanded'
                                    )
                                }
                            />
                        </Col>
                        <Col>
                            <select
                                value={item.parentId}
                                className="form-control"
                                onChange={(e) =>
                                    handleCategoryInput(
                                        'parentId',
                                        e.target.value,
                                        index,
                                        'expanded'
                                    )
                                }
                            >
                                <option value="">Select Category</option>3
                                {createCategoryList(category.categories).map(
                                    (option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </option>
                                    )
                                )}
                            </select>
                        </Col>

                        <Col>
                            <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                ))}

            <h6>Checked</h6>

            {checkedArray.length > 0 &&
                checkedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        'name',
                                        e.target.value,
                                        index,
                                        'checked'
                                    )
                                }
                            />
                        </Col>
                        <Col>
                            <select
                                value={item.parentId}
                                className="form-control"
                                onChange={(e) =>
                                    handleCategoryInput(
                                        'parentId',
                                        e.target.value,
                                        index,
                                        'checked'
                                    )
                                }
                            >
                                <option value="">Select Category</option>3
                                {createCategoryList(category.categories).map(
                                    (option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </option>
                                    )
                                )}
                            </select>
                        </Col>

                        <Col>
                            <select className="form-control">
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                ))}
            <input
                type="file"
                name="categoryImage"
                onChange={handleCategoryImage}
            />
        </Modal>
    )

    const renderAddCategoryModal = () => (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={'Add New Category'}
        >
            <Input
                value={categoryName}
                placeholder={`Category Name`}
                onChange={(e) => setCategoryName(e.target.value)}
            />

            <select
                value={parentCategoryId}
                className="form-control"
                onChange={(e) => setParentCategoryId(e.target.value)}
            >
                <option value="">Select Category</option>3
                {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>

            <br />
            <input
                type="file"
                name="categoryImage"
                onChange={handleCategoryImage}
            />
        </Modal>
    )

    /*NOTE */
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
                            <h3>Category</h3>
                            <Button variant="dark" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked(checked)}
                            onExpand={(expanded) => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosSquareOutline />,
                                halfCheck: <IoIosSquareOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={updateCategory}>Edit</Button>
                        <Button>Delete</Button>
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoriesModal()}
        </Layout>
    )
}

export default Category
