import React from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById } from '../../actions'

const ProductDetailsPage = (props) => {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product)

    React.useEffect(() => {
        const { productId } = props.match.params
        const payload = {
            params: {
                productId,
            },
        }

        dispatch(getProductDetailsById(payload))
    }, [])

    return (
        <Layout>
            <div>{JSON.stringify(product.productDetails.name)}</div>
        </Layout>
    )
}

export default ProductDetailsPage
