import React, { Component } from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/styles'
import { atob } from 'abab'
import isEmptyObject from 'is-empty-object'
import { MarkdownView } from 'react-native-markdown-view'

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

export class Code extends Component {

  render () {
    const { raw, loading } = this.props

    if (loading === true || isEmptyObject(raw)) {
      return (
        <ActivityIndicator style={{marginTop: 50}} />
      )
    }

    let isMarkdown = raw.name.match(/.md/)
    let language = ''

    if (raw.name.match(/.js/)) {
      language = 'JavaScript'
    } else if (raw.name.match(/.html/)) {
      language = 'HTML'
    } else if (raw.name.match(/.css/)) {
      language = 'CSS'
    } else if (raw.name.match(/.json/)) {
      language = 'JSON'
    }

    const content = atob(raw.content)

    return (
      <View style={styles.list}>
        {
          isMarkdown
          ? <MarkdownView>{content}</MarkdownView>
          : (
            <SyntaxHighlighter
              language={language}
              style={docco}
            >
              {content}
            </SyntaxHighlighter>
          )
        }
      </View>
    )
  }
}

export default Code
