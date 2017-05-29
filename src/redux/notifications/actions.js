import t from './actionTypes'

import { getNotifications } from '../../api/github-api'
import { requestNotifications, receiveNotifications } from '../loading/actions'

export function fetchNotifications () {
  return dispatch => {
    dispatch(requestNotifications())

    getNotifications()
      .then(({ data }) => {
        dispatch(receiveNotifications())

        dispatch(setNotifications(data))
      })
      .catch(err => {
        dispatch(receiveNotifications())
      })
  }
}

export function setNotifications (notifications) {
  return {
    type: t.SET_NOTIFICATIONS,
    notifications
  }
}
