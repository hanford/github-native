export async function getTrending () {
  try {
    const res = await fetchData('https://github-trending.now.sh/?language=javascript&daysAgo=8')
    const { repos } = await res.json()

    return { repos }
  }
  catch (err) {
    throw err
  }
}


function fetchData (url) {
  return fetch(url)
}
