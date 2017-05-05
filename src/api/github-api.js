const api = 'http://192.168.10.60:3000'

export async function fetchNotifications () {
  return fetch(`${api}/notifications`)
    .then(r => r.json())
    .then(data => {
      // const sorted = {}

      // data.forEach(data => {
      //   const { repository } = data

      //   if (sorted[repository.full_name]) {
      //     sorted[repository.full_name].push(data)
      //   } else {
      //     sorted[repository.full_name] = [ data ]
      //   }
      // })

      return {
        data
      }
    })
    .catch(err => {
      throw err
    })
}

export async function fetchRepos () {
  return fetch(`${api}/repos`)
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


export async function fetchIssues () {
  return fetch(`${api}/issues`)
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

// export async function searchRepos (query) {
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
