import t from './actionTypes'

const initialState = {
  text: '',
  category: 0,
  results: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_SEARCH_TEXT:
      return {
        ...state,
        text: action.text
      }

    case t.SET_SEARCH_CATEGORY:
      return {
        ...state,
        category: action.category
      }

    case t.SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.results
      }

    default:
      return state
  }
}
