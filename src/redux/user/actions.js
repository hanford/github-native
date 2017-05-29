import OAuthManager from 'react-native-oauth'

import t from './actionTypes'

import { saveToken } from '../../api/github-api'
import config from '../../../config.json'

import { fetchNotifications } from '../notifications/actions'
import { fetchTimeline } from '../timeline/actions'
import { fetchIssues } from '../issues/actions'
import { fetchRepos } from '../repos/actions'

const manager = new OAuthManager('githubnative')
manager.configure(config)

export function login () {
  return dispatch => {
    manager.authorize('github', {scopes: 'user repo notifications'})
      .then(({ response }) => {
        const token = response.credentials.accessToken

        dispatch(setToken(token))
      })
      .catch(err => console.log('There was an error'))
  }
}

export function logout () {
  return dispatch => {
    manager.deauthorize('github')
  }
}

export function setToken (token) {
  saveToken(token)

  return dispatch => {
    dispatch({ type: t.SET_TOKEN, token })

    // get initial data
    dispatch(fetchNotifications())
    dispatch(fetchTimeline())
    dispatch(fetchIssues())
    dispatch(fetchRepos())
  }
}
