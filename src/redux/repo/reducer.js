import t from './actionTypes'

const initialState = {
  data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_REPO:
      return {
        ...state,
        data: action.repo
      }

    default:
      return state
  }
}
