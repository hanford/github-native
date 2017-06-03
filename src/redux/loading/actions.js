import t from './actionTypes'

export function requestIssues () {
  return {
    type: t.REQUEST_ISSUES
  }
}

export function receiveIssues () {
  return {
    type: t.RECEIVE_ISSUES
  }
}

export function requestRepos () {
  return {
    type: t.REQUEST_REPOS
  }
}

export function receiveRepos () {
  return {
    type: t.RECEIVE_REPOS
  }
}

export function requestTimeline () {
  return {
    type: t.REQUEST_TIMELINE
  }
}

export function receiveTimeline () {
  return {
    type: t.RECEIVE_TIMELINE
  }
}

export function requestNotifications () {
  return {
    type: t.REQUEST_NOTIFICATIONS
  }
}

export function receiveNotifications () {
  return {
    type: t.RECEIVE_NOTIFICATIONS
  }
}

export function requestTrending () {
  return {
    type: t.REQUEST_TRENDING
  }
}

export function receiveTrending () {
  return {
    type: t.RECEIVE_TRENDING
  }
}

export function requestProfile () {
  return {
    type: t.REQUEST_PROFILE
  }
}

export function receiveProfile () {
  return {
    type: t.RECEIVE_PROFILE
  }
}

export function requestSearch () {
  return {
    type: t.REQUEST_SEARCH
  }
}

export function receiveSearch () {
  return {
    type: t.RECEIVE_SEARCH
  }
}
