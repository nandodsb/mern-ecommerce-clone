import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import CheckboxTree from 'react-checkbox-tree'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

// import { Container } from './styles';

const Category = (props) => {
    const category = useSelector((state) => state.category)
    const dispatch = useDispatch()

    //NOTE React States
    const [show, setShow] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])

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
            options.push({ value: category._id, name: category.name })
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
                {/*NOTE */}
                <Row>
                    <Col md={12}>
                        {/*<ul>{renderCategories(category.categories)}</ul>*/}

                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked({ checked })}
                            onExpand={(expanded) => setExpanded({ expanded })}
                        />
                    </Col>
                </Row>
            </Container>

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
        </Layout>
    )
}

export default Category
