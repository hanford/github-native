import OAuthManager from 'react-native-oauth'

import t from './actionTypes'

import { saveToken, getUserProfile } from '../../api/github-api'
import config from '../../../config.json'

import { requestProfile, receiveProfile } from '../loading/actions'
import { fetchNotifications } from '../notifications/actions'
import { fetchTimeline } from '../timeline/actions'
import { fetchTrending } from '../trending/actions'
import { fetchIssues } from '../issues/actions'
import { fetchRepos } from '../repos/actions'

const manager = new OAuthManager('githubnative')
manager.configure(config)

export function fetchProfile () {
  return dispatch => {
    dispatch(requestProfile())

    getUserProfile()
      .then(({ data }) => {
        dispatch(receiveProfile())
        dispatch(setUserProfile(data))
      })
      .catch(err => {
        dispatch(receiveProfile())
      })
  }
}

function setUserProfile (profile) {
  return {
    type: t.SET_USER_PROFILE,
    profile
  }
}

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
    dispatch(fetchTrending())
    dispatch(fetchIssues())
    dispatch(fetchRepos())
    dispatch(fetchProfile())
  }
}
