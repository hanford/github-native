import sortOn from 'sort-on'
import t from './actionTypes'

import { getRepo, getRepoContent } from '../../api/github-api'
import { fetchRepoContent } from '../code/actions'
import { requestRepos, receiveRepos } from '../loading/actions'

export function fetchRepo (name) {
  return dispatch => {
    dispatch(requestRepos())
    dispatch(fetchRepoContent(name))

    getRepo(name)
      .then(({ data }) => {
        dispatch(receiveRepos())

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
