import sortOn from 'sort-on'
import t from './actionTypes'

import { getTrending } from '../../api/trending-api'
import { requestTrending, receiveTrending } from '../loading/actions'

export function fetchTrending () {
  return dispatch => {
    dispatch(requestTrending())

    getTrending()
      .then(({ repos }) => {
        dispatch(receiveTrending())
        const data = sortOn(repos, '-stargazers_count')
        dispatch(setTrending(data))
      })
      .catch(err => {
        dispatch(receiveTrending())
      })
  }
}

export function setTrending (trending) {
  return {
    type: t.SET_TRENDING,
    trending
  }
}
