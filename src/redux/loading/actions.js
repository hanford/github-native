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
