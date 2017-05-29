import sortOn from 'sort-on'
import t from './actionTypes'

import { getRepos } from '../../api/github-api'
import { requestRepos, receiveRepos } from '../loading/actions'

export function fetchRepos () {
  return dispatch => {
    dispatch(requestRepos())

    getRepos()
      .then(({ data }) => {
        dispatch(receiveRepos())
        const repos = sortOn(data, '-stargazers_count')
        dispatch(setRepos(repos))
      })
      .catch(err => {
        dispatch(receiveRepos())
      })
  }
}

export function setRepos (repos) {
  return {
    type: t.SET_REPOS,
    repos
  }
}
