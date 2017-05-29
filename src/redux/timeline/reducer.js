import t from './actionTypes'

const initialState = {
  loading: false,
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.FETCH_TIMELINE:
      return {
        ...state,
        loading: true
      }

    case t.SET_TIMELINE:
      return {
        ...state,
        loading: false,
        list: action.timeline
      }

    default:
      return state
  }
}
