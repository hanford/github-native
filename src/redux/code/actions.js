import sortOn from 'sort-on'
import t from './actionTypes'

import { getRepoContent, getNestedRepoContent } from '../../api/github-api'
import { requestRepos, receiveRepos } from '../loading/actions'

export function fetchRepoContent (name) {
  return dispatch => {
    dispatch(requestRepos())

    getRepoContent(name)
      .then(({ data }) => {
        dispatch(receiveRepos())

        dispatch(setRepoContent(data))
      })
      .catch(err => {
        dispatch(receiveRepos())
      })
  }
}


export function fetchNestedRepoContent (path) {
  return (dispatch, getState) => {
    const state = getState()
    console.log('fetchNestedRepoContent')
    const { repo: { data: { full_name }}} = state
    dispatch(requestRepos())

    getNestedRepoContent(full_name, path)
      .then(({ data }) => {
        dispatch(receiveRepos())
        console.log(data)
        dispatch(setRepoContent(data))
      })
      .catch(err => {
        dispatch(receiveRepos())
      })
  }
}

function setRepoContent (content) {
  return {
    type: t.SET_REPO_CONTENT,
    content
  }
}


function setRepoContent (content) {
  return {
    type: t.SET_REPO_CONTENT,
    content
  }
}
