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
        onSubmit,
    } = props

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
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
                        {categoryList.map((option, index) => (
                            <option key={index} value={option.value}>
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
