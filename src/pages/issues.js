import React, { PureComponent } from 'react'
import { StyleSheet, TextInput, View, Text, ScrollView, RefreshControl } from 'react-native'
import { partial } from 'ap'

import { fetchIssues } from '../api/github-api'
import { Header } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  list: {
    flex: 1
  },
  item: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    fontSize: 22
  },
  issue: {
    fontSize: 16,
    color: '#00bf8b'
  }
})

export class Issues extends PureComponent {

  state = {
    issues: [],
    loading: true
  }

  getissues = () => {
    this.setState({ loading: true })

    return fetchIssues()
      .then(({ data }) => this.setState({ issues: data, loading: false }))
  }

  componentWillMount () {
    this.getissues()
  }

  _onRefresh = () => {
    this.getissues()
  }

  render () {
    const { issues, url } = this.state

    if (!issues) return null

    return (
      <View style={styles.container}>
        <Header>Issues ({issues.length})</Header>

        <ScrollView
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
              tintColor='black'
              title='Loading...'
              titleColor='black'
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor='#ffff00'
            />
          }
        >
          {
            issues.map((n, index) => (
              <View style={styles.item} key={index}>
                <Text style={styles.title}>{n.title}</Text>
                <Text style={styles.issue}>{n.state}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

export default Issues
