import t from './actionTypes'

const initialState = {
  token: ''
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_TOKEN:
      return {
        ...state,
        token: action.token
      }

    default:
      return state
  }
}
