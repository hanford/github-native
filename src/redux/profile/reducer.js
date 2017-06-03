import t from './actionTypes'

const initialState = {
  profile: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }

    default:
      return state
  }
}
