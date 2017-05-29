import t from './actionTypes'

import { getTimeline } from '../../api/github-api'

export function fetchTimeline () {
  return dispatch => {
    dispatch({ type: t.FETCH_TIMELINE })

    getTimeline()
      .then(({ data }) => {
        dispatch(setTimeline(data))
      })
  }
}

export function setTimeline (timeline) {
  return {
    type: t.SET_TIMELINE,
    timeline
  }
}
