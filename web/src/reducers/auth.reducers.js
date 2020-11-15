import { authConstants } from "../actions/constants"

const initialState = {
  name: 'Veronica'
}


export default (state = initialState, action) => {

  console.log(action)

  // eslint-disable-next-line
  switch(action.type) {
    case authConstants.LOGIN_REQUEST :
      state  = {
        ...state,
        ...action.payload
      }
      break;
  }  
  return state
}