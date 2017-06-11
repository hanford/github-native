import React, { PureComponent } from 'react'
import fecha from 'fecha'

import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  View,
  Text,
} from 'react-native'

import isEmptyObject from 'is-empty-object'

import { RepoItem } from '../../components'

export class Repo extends PureComponent {

  viewCode = () => {
    const { navigator } = this.props

    navigator.push({
      screen: 'githubnative.Tree',
      title: 'Tree',
      animated: true
    })
  }

  render () {
    const { repo, loading } = this.props
    console.log(repo)

    if (loading || isEmptyObject(repo)) {
      return (
        <ActivityIndicator style={{marginTop: 40}}/>
      )
    }

    return (
      <View style={styles.repo}>
        <View style={styles.breakdown}>
          <Image
            source={{uri: repo.owner.avatar_url}}
            style={styles.avatar}
          />
          <View style={styles.repoDescription}>
            <Text style={styles.name}>{repo.name}</Text>
            <Text style={styles.description}>{repo.description}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.statItem}>Stars {repo.stargazers_count}</Text>
          <Text style={styles.statItem}>Issues {repo.open_issues}</Text>
          <Text style={styles.statItem}>Forks {repo.forks_count}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text>Updated</Text>
          <Text>{fecha.format(new Date(repo.updated_at), 'M/D/YY h:mm A')}</Text>
        </View>

        <TouchableOpacity onPress={this.viewCode}>
          <View style={styles.detailItem}>
            <Text>View Code</Text>
            <Text>{repo.language}</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }
}

export default Repo

const styles = StyleSheet.create({
  repo: {
    flex: 1,
    padding: 20
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10
  },
  repoDescription: {
    flex: 1
  },
  name: {
    fontSize: 20
  },
  description: {
    fontSize: 14,
    color: 'gray'
  },
  breakdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    paddingBottom: 10
  },
  detailRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    paddingBottom: 10
  },
  detailItem: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    paddingBottom: 10
  },
  statItem: {
    alignItems: 'center'
  }
})
