import axios from '../helpers/axios'
import { userConstants } from './constants'

export const signup = (user) => {
    console.log(user)

    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST })
        const response = await axios.post(`/admin/signup`, {
            ...user,
        })

        if (response.status === 200) {
            const { message } = response.data

            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    message,
                },
            })
        } else {
            if (response.status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: { error: response.data.error },
                })
            }
        }

        /*dispatch({
          type: authConstants.LOGIN_REQUEST,
          payload: {
              ...user,
          },
      })*/
    }
}
