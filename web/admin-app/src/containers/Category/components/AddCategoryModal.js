import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Input from '../../../components/UI/Input'
import Modal from '../../../components/UI/Modal'

const AddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
    } = props

    return (
        <Modal show={show} handleClose={handleClose} modalTitle={modalTitle}>
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>

                <Col>
                    <select
                        value={parentCategoryId}
                        className="form-control-sm"
                        onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                        <option value="">Select Category</option>3
                        {categoryList.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>

            <Row>
                <Col>
                    <input
                        type="file"
                        name="categoryImage"
                        onChange={handleCategoryImage}
                    />
                </Col>
            </Row>
        </Modal>
    )
}

export default AddCategoryModal
