import t from './actionTypes'

const initialState = {
  issues: false,
  repos: false,
  notifications: false,
  timeline: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.REQUEST_ISSUES:
      return {
        ...state,
        issues: true
      }

    case t.RECEIVE_ISSUES:
      return {
        ...state,
        issues: false
      }

    case t.REQUEST_REPOS:
      return {
        ...state,
        repos: true
      }

    case t.RECEIVE_REPOS:
      return {
        ...state,
        repos: false
    }

    case t.REQUEST_TIMELINE:
      return {
        ...state,
        timeline: true
      }

    case t.RECEIVE_TIMELINE:
      return {
        ...state,
        timeline: false
      }

    case t.REQUEST_NOTIFICATIONS:
      return {
        ...state,
        notifications: true
      }

    case t.RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: false
      }

    default:
      return state
  }
}
