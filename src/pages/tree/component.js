import React, { PureComponent } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import { partial } from 'ap'
import fecha from 'fecha'

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  contentLink: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fileName: {
    fontSize: 16
  },
  typeIcon: {
    marginRight: 10
  }
})

export class Tree extends PureComponent {

  goNested = (path, isDirectory) => {
    const { navigator, fetchNestedRepoContent } = this.props

    fetchNestedRepoContent(path, isDirectory)

    if (!isDirectory) {
      const { navigator } = this.props

      navigator.push({
        screen: 'githubnative.Code',
        title: path,
        animated: true
      })
    }
  }

  renderIsntRootBack = () => {
    const { content, goBack } = this.props

    if (content.length > 1) {
      return (
        <TouchableOpacity
          style={styles.contentLink}
          onPress={goBack}
        >
          <Text style={styles.fileName}>..</Text>
        </TouchableOpacity>
      )
    }
  }

  render () {
    const { content } = this.props
    const currPath = content[content.length - 1]

    return (
      <View style={styles.list}>
        <ScrollView
          style={{flex: 1}}
        >
          {this.renderIsntRootBack()}

          {
            currPath.map(({ name, type, path }, index) => {
              const isDirectory = type === 'dir'

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.contentLink}
                  onPress={() => this.goNested(path, isDirectory)}
                >
                  <Image
                    style={styles.typeIcon}
                    source={
                      isDirectory
                      ? require('../../icons/dir@2x.png')
                      : require('../../icons/file@2x.png')
                    }
                  />
                  <Text style={styles.fileName}>{name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

export default Tree
