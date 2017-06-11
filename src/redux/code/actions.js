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

export function fetchNestedRepoContent (path, isDirectory) {
  return (dispatch, getState) => {
    const state = getState()
    const { repo: { data: { full_name }}} = state

    dispatch(requestRepos())

    getNestedRepoContent(full_name, path)
      .then(({ data }) => {
        dispatch(receiveRepos())

        if (isDirectory) {
          dispatch(setRepoContent(data))
        } else {
          dispatch(setRawContent(data))
        }
      })
      .catch(err => {
        dispatch(receiveRepos())
      })
  }
}

function setRawContent (content) {
  return {
    type: t.SET_RAW_CONTENT,
    content
  }
}


function setRepoContent (content) {
  return {
    type: t.SET_REPO_CONTENT,
    content
  }
}

export function goBack () {
  return {
    type: t.GO_BACK
  }
}
