const api = 'https://api.github.com'

let token = ''

export const setToken = (t) => token = t
export const getToken = (t) => token

export async function fetchNotifications () {
  try {
    const res = await fetchData('notifications')
    const data = await res.json()

    return { data }
  }
  catch (err) {
    throw err
  }
}

export async function fetchRepos () {
  try {
    const res = await fetchData('user/repos')
    const data = await res.json()

    return { data }
  }
  catch (err) {
    throw err
  }
}


export async function fetchIssues () {
  try {
    const res = await fetchData('user/issues')
    const data = await res.json()

    return { data }
  }
  catch (err) {
    throw err
  }
}

function fetchData (url) {
  return fetch(`${api}/${url}?access_token=${token}`)
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
