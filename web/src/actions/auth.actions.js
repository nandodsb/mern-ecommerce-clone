import axios from '../helpers/axios'
import { authConstants } from './constants'

export const login = (user) => {
    console.log(user)

    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const response = await axios.post(`/admin/signin`, {
            ...user,
        })

        if (response.status === 200) {
            const { token, user } = response.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            })
        } else {
            if (response.status === 401) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
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

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            })
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' },
            })
        }
    }
}

export const signout = () => {
    return async (dispatch) => {
        localStorage.clear()
        dispatch({
            type: authConstants.LOGOUT_REQUEST,
        })
    }
}
