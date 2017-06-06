import t from './actionTypes'

const initialState = {
  focus: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_REPO:
      return {
        ...state,
        focus: action.repo
      }

    default:
      return state
  }
}
