import sortOn from 'sort-on'
import t from './actionTypes'

import { getTrending } from '../../api/trending-api'
import { requestTrending, receiveTrending } from '../loading/actions'

export function fetchTrending () {
  return (dispatch, getState) => {
    const state = getState()
    const { time, language } = state.trending

    dispatch(requestTrending())

    getTrending({time, language})
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


export function setLanguage (language) {
  return dispatch => {
    dispatch({ type: t.SET_TRENDING_LANGUAGE, language })
    dispatch(fetchTrending())  
  }
}


export function setTime (time) {
  return dispatch => {
    dispatch({ type: t.SET_TRENDING_TIME, time })
    dispatch(fetchTrending())
  }
}
