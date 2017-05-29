import t from './actionTypes'

import { getIssues } from '../../api/github-api'

export function fetchIssues () {
  return dispatch => {
    dispatch({ type: t.FETCH_ISSUES })

    getIssues()
      .then(({ data }) => {
        dispatch(setIssues(data))
      })
  }
}

export function setIssues (issues) {
  return {
    type: t.SET_ISSUES,
    issues
  }
}
