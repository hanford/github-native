import { getUsersProfile, getUsersRepos } from '../../api/github-api'

import { requestProfile, receiveProfile } from '../loading/actions'
import { setRepos } from '../repos/actions'

import t from './actionTypes'

export function setUserProfile (profile) {
  return {
    type: t.SET_USER_PROFILE,
    profile
  }
}

export function fetchUser (login) {
  return dispatch => {
    dispatch(requestProfile())

    Promise.all([
      getUsersProfile(login),
      getUsersRepos(login)
    ])
      .then(data => {
        dispatch(receiveProfile())
        dispatch(setUserProfile(data[0].data))
        dispatch(setRepos(data[1].data))
      })
      .catch(err => {
        dispatch(receiveProfile())
      })
  }
}
