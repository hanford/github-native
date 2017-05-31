import t from './actionTypes'

const initialState = {
  token: '',
  profile: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_TOKEN:
      return {
        ...state,
        token: action.token
      }

    case t.SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }

    default:
      return state
  }
}
