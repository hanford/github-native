import t from './actionTypes'

const initialState = {
  content: [],
  raw: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_REPO_CONTENT:
      return {
        ...state,
        content: [...state.content, action.content]
      }

    case t.SET_RAW_CONTENT:
      return {
        ...state,
        raw: action.content
      }


    case t.GO_BACK:
      // get rid of most recent element
      state.content.pop()
      return {
        ...state,
        content: [...state.content]
      }

    default:
      return state
  }
}
