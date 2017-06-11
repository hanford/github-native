import React, { PureComponent } from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/styles'
import { atob } from 'abab'

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

export class Code extends PureComponent {

  render () {
    const { raw } = this.props

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
