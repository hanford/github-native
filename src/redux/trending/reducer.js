import t from './actionTypes'

const initialState = {
  list: [],
  language: 'any',
  time: '8'
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_TRENDING:
      return {
        ...state,
        list: action.trending
      }

    case t.SET_TRENDING_LANGUAGE:
      return {
        ...state,
        language: action.language
      }

  case t.SET_TRENDING_TIME:
    return {
      ...state,
      time: action.time
    }

    default:
      return state
  }
}
