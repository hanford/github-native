import t from './actionTypes'

export function setToken (token) {
  return {
    type: t.SET_TOKEN,
    token
  }
}
