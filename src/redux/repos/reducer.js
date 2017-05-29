import t from './actionTypes'

const initialState = {
  loading: false,
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.FETCH_REPOS:
      return {
        ...state,
        loading: true
      }

    case t.SET_REPOS:
      return {
        ...state,
        loading: false,
        list: action.repos
      }

    default:
      return state
  }
}
