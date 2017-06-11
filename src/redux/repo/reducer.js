import t from './actionTypes'

const initialState = {
  data: {},
  content: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_REPO:
      return {
        ...state,
        data: action.repo
      }

    case t.SET_REPO_CONTENT:
      return {
        ...state,
        content: action.content
      }

    default:
      return state
  }
}
