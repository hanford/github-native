import { searchRepos, searchUsers } from '../../api/github-api'

import { requestSearch, receiveSearch } from '../loading/actions'
import t from './actionTypes'

export function setSearchText (text) {
  return {
    type: t.SET_SEARCH_TEXT,
    text
  }
}

export function setSearchCategory (category) {
  return {
    type: t.SET_SEARCH_CATEGORY,
    category
  }
}

function setSearchResults (results) {
  return {
    type: t.SET_SEARCH_RESULTS,
    results
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

    console.log(text)
    searchToRun(text)
      .then(({ data: { items } }) => {
        dispatch(receiveSearch())
        dispatch(setSearchResults(items))
      })
      .catch(err => {
        dispatch(receiveSearch())
      })
  }
}
