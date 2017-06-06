import React, { PureComponent } from 'react'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { RepoItem } from '../../components'

const styles = StyleSheet.create({
  repo: {
    flex: 1
  }
})

export class Repo extends PureComponent {

  render () {

    return (
      <View style={styles.repo}>
        <Text>Repo!</Text>
      </View>
    )
  }
}

export default Repo
