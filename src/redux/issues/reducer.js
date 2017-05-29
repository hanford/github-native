import t from './actionTypes'

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_ISSUES:
      return {
        ...state,
        list: action.issues
      }

    default:
      return state
  }
}
