import axios from '../helpers/axios'
import { productConstants } from './constants'

export const addProduct = (form) => {
    return async (dispatch) => {
        dispatch({ type: productConstants.ADD_NEW_PRODUCT_REQUEST })
        const res = await axios.post(`/product/create`, form)
        if (res.status === 201) {
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_REQUEST,
                payload: { product: res.data.product },
            })
        } else {
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_REQUEST,
                payload: res.data.error,
            })
        }
    }
}
