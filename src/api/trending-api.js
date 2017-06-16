export async function getTrending ({ time, language }) {
  if (language === 'any') {
    language = 'javascript%20language%3Apython%20language%3Apythonlanguage%3Apython%20language%3Ago%20language%3Ahtml%20language%3Acss%20language%3Ajava'
  }

  try {
    const res = await fetchData(`https://github-trending.now.sh/?language=${language}&daysAgo=${time}`)
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
