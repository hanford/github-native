import React, { PureComponent } from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/styles'
import { atob } from 'abab'
import isEmptyObject from 'is-empty-object'

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

export class Code extends PureComponent {

  render () {
    const { raw, loading } = this.props

    if (loading === true || isEmptyObject(raw)) {
      return (
        <ActivityIndicator style={{marginTop: 50}} />
      )
    }

    return (
      <View style={styles.list}>
        <SyntaxHighlighter
          language={raw.language}
          style={docco}
        >
          {atob(raw.content)}
        </SyntaxHighlighter>
      </View>
    )
  }
}

export default Code
