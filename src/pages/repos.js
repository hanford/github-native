import React, { PureComponent } from 'react'
import { StyleSheet, TextInput, View, Text, ScrollView, RefreshControl } from 'react-native'
import sortOn from 'sort-on'

import { RepoItem, Header, Page } from '../components'
import { fetchRepos } from '../api/github-api'

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

export class Repos extends PureComponent {

  state = {
    repos: [],
    loading: true
  }

  componentWillMount () {
    this.getRepos()
  }

  getRepos = () => {
    this.setState({ loading: true })

    return fetchRepos()
      .then(({ data }) => {
        const repos = sortOn(data, '-stargazers_count')

        this.setState({ repos, loading: false })
      })
  }

  onRefresh = () => {
    this.getRepos()
  }

  render () {
    const { repos } = this.state

    if (!repos) return null

    return (
      <Page>
        <Header>Repos ({repos.length})</Header>

        <ScrollView
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.onRefresh}
              tintColor='black'
              title='Loading...'
              titleColor='black'
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor='#ffff00'
            />
          }
        >
          {
            repos.map((n, index) => <RepoItem key={index} name={n.name} language={n.language} description={n.description} stars={n.stargazers_count} />)
          }
        </ScrollView>

      </Page>
    )
  }
}

export default Repos

