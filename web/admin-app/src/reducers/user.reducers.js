import { userConstants } from '../actions/constants'

const initialState = {
    error: null,
    message: '',
    loading: false,
}

export default (state = initialState, action) => {
    console.log(action)

    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break

        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
            }
            break

        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break

        default:
            return initialState
    }
    return state
}
