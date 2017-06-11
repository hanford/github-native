import t from './actionTypes'

const initialState = {
  content: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_REPO_CONTENT:
      return {
        ...state,
        content: [...state.content, action.content]
      }

    default:
      return state
  }
}
