import React, { PureComponent } from 'react'

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image
} from 'react-native'

import isEmptyObject from 'is-empty-object'

import { RepoItem } from '../../components'

const styles = StyleSheet.create({
  repo: {
    flex: 1,
    padding: 20
  },
  name: {
    fontSize: 20
  },
  avatar: {
    height: 60,
    width: 60,
    marginBottom: 10,
    borderRadius: 30,
    marginRight: 10
  }
})

export class Repo extends PureComponent {

  render () {
    const { repo, loading } = this.props

    if (loading || isEmptyObject(repo)) {
      return (
        <ActivityIndicator style={{marginTop: 40}}/>
      ) 
    }

    return (
      <View style={styles.repo}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: repo.owner.avatar_url}}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{repo.name}</Text>
            <Text style={{fontSize: 16, color: 'gray'}}>{repo.owner.login}</Text>
          </View>
        </View>

        <Text>watchers: {repo.watchers}</Text>
        <Text>watcher_count: {repo.watcher_count}</Text>
        <Text>updated_at: {repo.updated_at}</Text>
        <Text>stargazers_count: {repo.stargazers_count}</Text>
        <Text>open_issues: {repo.open_issues}</Text>
        <Text>language: {repo.language}</Text>
        <Text>full_name: {repo.full_name}</Text>
        <Text>forks_count: {repo.forks_count}</Text>
        <Text>created_at: {repo.created_at}</Text>
      </View>
    )
  }
}

export default Repo
