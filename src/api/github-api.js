const api = 'http://192.168.10.60:3000'

let token = ''

export const setToken = (t) => token = t
export const getToken = (t) => token

export function fetchNotifications () {
  console.log(`${api}/notifications?access_token=${token}`)

  return fetch(`${api}/notifications?access_token=${token}`)
    .then(r => r.json())
    .then(data => {

      return {
        data
      }
    })
    .catch(err => {
      throw err
    })
}

export function fetchRepos () {
  console.log(`${api}/repos?access_token=${token}`)

  return fetch(`${api}/repos?access_token=${token}`)
    .then(r => r.json())
    .then(data => {

      return {
        data
      }
    })
    .catch(err => {
      throw err
    })
}


export function fetchIssues () {
  console.log(`${api}/issues?access_token=${token}`)

  return fetch(`${api}/issues?access_token=${token}`)
    .then(r => r.json())
    .then(data => {

      return {
        data
      }
    })
    .catch(err => {
      throw err
    })
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
