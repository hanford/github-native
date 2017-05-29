import t from './actionTypes'

import { getNotifications } from '../../api/github-api'

export function fetchNotifications () {
  return dispatch => {
    dispatch({ type: t.FETCH_NOTIFICATIONS })

    getNotifications()
      .then(({ data }) => {
        dispatch(setNotifications(data))
      })
  }
}

export function setNotifications (notifications) {
  return {
    type: t.SET_NOTIFICATIONS,
    notifications
  }
}
