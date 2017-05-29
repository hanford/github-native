import t from './actionTypes'

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_TRENDING:
      return {
        ...state,
        list: action.repos
      }

    default:
      return state
  }
}
