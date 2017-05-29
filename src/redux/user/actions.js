import t from './actionTypes'
import { saveToken } from '../../api/github-api'

import { fetchNotifications } from '../notifications/actions'
import { fetchTimeline } from '../timeline/actions'

export function setToken (token) {
  saveToken(token)

  return dispatch => {
    dispatch({ type: t.SET_TOKEN, token })

    // get initial data
    dispatch(fetchNotifications())
    dispatch(fetchTimeline())
  }
}
