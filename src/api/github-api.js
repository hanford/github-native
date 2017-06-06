const api = 'https://api.github.com'

let token = ''

export const setToken = t => token = t
export const saveToken = t => token = t
export const getToken = t => token

export async function getNotifications () {
  try {
    const res = await fetchData('notifications?all=true')
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function getRepos () {
  try {
    const res = await fetchData('user/repos?per_page=1000')
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function getRepo (name) {
  try {
    const res = await fetchData(`repos/${name}`)
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function getTimeline () {
  try {
    const res = await fetchData('users/hanford/received_events')
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function getIssues () {
  try {
    const res = await fetchData('user/issues')
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function getUsersProfile (login) {
  try {
    const res = await fetchData(`users/${login}`)
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function getUsersRepos (login) {
  try {
    const res = await fetchData(`users/${login}/repos?per_page=1000`)
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function getCurrentUserProfile () {
  try {
    const res = await fetchData('user')
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function searchRepos (query) {
  try {
    const res = await fetchData(`search/repositories?q=${query}`)
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

export async function searchUsers (query) {
  try {
    const res = await fetchData(`search/users?q=${query}`)
    const data = await res.json()

    return {
      data
    }
  }
  catch (err) {
    throw err
  }
}

function fetchData (url) {
  let ghUrl = `${api}/${url}`
  let authedUrl = ''

  if (url.indexOf('?') > -1) {
    authedUrl = `${ghUrl}&access_token=${token}`
  } else {
    authedUrl = `${ghUrl}?access_token=${token}`
  }

  return fetch(authedUrl)
}

// export function searchRepos (query) {
//   console.log('searching', query)
//   return fetch(`${api}/repo/search/${query}`)
//     .then(r => r.json())
//     .then(data => {

//       return {
//         data
//       }
//     })
//     .catch(err => {
//       throw err
//     })
// }
