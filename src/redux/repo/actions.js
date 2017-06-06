import sortOn from 'sort-on'
import t from './actionTypes'

import { getRepo } from '../../api/github-api'
import { requestRepos, receiveRepos } from '../loading/actions'

export function fetchRepo (name) {
  return dispatch => {
    dispatch(requestRepos())

    getRepo(name)
      .then(({ data }) => {
        dispatch(receiveRepos())
        console.log(data)
        dispatch(setRepo(data))
      })
      .catch(err => {
        dispatch(receiveRepos())
      })
  }
}

function setRepo (repo) {
  return {
    type: t.SET_REPO,
    repo
  }
}
