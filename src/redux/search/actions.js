import { searchRepos, searchUsers } from '../../api/github-api'

import { requestSearch, receiveSearch } from '../loading/actions'
import t from './actionTypes'

export function setSearchText (search) {
  return {
    type: t.SET_SEARCH_TEXT,
    search
  }
}

export function setSearchCategory (category) {
  return {
    type: t.SET_SEARCH_CATEGORY,
    category
  }
}

export function searchUsersOrRepos () {
  return (dispatch, getState) => {
    const state = getState()
    const { text, category } = state.search

    let searchToRun

    if (category === 0) {
      searchToRun = searchUsers
    } else {
      searchToRun = searchRepos
    }

    dispatch(requestSearch())

    searchToRun(text)
      .then(({ data }) => {
        dispatch(receiveSearch())
        console.log(data)
      })
      .catch(err => {
        dispatch(receiveSearch())
      })
  }
}
