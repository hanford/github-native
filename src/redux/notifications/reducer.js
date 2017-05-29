import t from './actionTypes'

const initialState = {
  loading: false,
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.FETCH_NOTIFICATIONS:
      return {
        ...state,
        loading: true
      }

    case t.SET_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        list: action.notifications
      }

    default:
      return state
  }
}
