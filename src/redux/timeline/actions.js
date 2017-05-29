import t from './actionTypes'

import { requestNotifications, receiveNotifications } from '../loading/actions'
import { getTimeline } from '../../api/github-api'

export function fetchTimeline () {
  return dispatch => {
    dispatch(requestNotifications())

    getTimeline()
      .then(({ data }) => {
        dispatch(receiveNotifications())
        dispatch(setTimeline(data))
      })
      .catch(err => {
        dispatch(receiveNotifications())
      })
  }
}

export function setTimeline (timeline) {
  return {
    type: t.SET_TIMELINE,
    timeline
  }
}
