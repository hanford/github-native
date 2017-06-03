import t from './actionTypes'

const initialState = {
  text: '',
  category: 0
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

    default:
      return state
  }
}
