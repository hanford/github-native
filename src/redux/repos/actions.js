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
        dispatch(setRepos(repos))
      })
      .catch(err => {
        dispatch(receiveRepos())
      })
  }
}

function sortRepos (repos) {
  return sortOn(repos, '-stargazers_count')
}

export function setRepos (repos) {
  repos = sortRepos(repos)
  return {
    type: t.SET_REPOS,
    repos
  }
}
