import t from './actionTypes'

import { getIssues } from '../../api/github-api'
import { requestNotifications, receiveNotifications } from '../loading/actions'

export function fetchIssues () {
  return dispatch => {
    dispatch(requestNotifications())

    getIssues()
      .then(({ data }) => {
        dispatch(receiveNotifications())
        dispatch(setIssues(data))
      })
      .catch(err => {
        dispatch(receiveNotifications())
      })
  }
}

export function setIssues (issues) {
  return {
    type: t.SET_ISSUES,
    issues
  }
}
