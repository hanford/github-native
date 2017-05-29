import t from './actionTypes'

import { getRepos } from '../../api/github-api'

export function fetchRepos () {
  return dispatch => {
    dispatch({ type: t.FETCH_REPOS })

    getRepos()
      .then(({ data }) => {
        dispatch(setRepos(data))
      })
  }
}

export function setRepos (repos) {
  return {
    type: t.SET_REPOS,
    repos
  }
}
