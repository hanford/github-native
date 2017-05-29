import t from './actionTypes'

const initialState = {
  loading: false,
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.FETCH_ISSUES:
      return {
        ...state,
        loading: true
      }

    case t.SET_ISSUES:
      return {
        ...state,
        loading: false,
        list: action.issues
      }

    default:
      return state
  }
}
