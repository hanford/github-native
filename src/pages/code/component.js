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

export class Code extends PureComponent {

  goNested = path => {
    const { navigator, fetchNestedRepoContent } = this.props

    fetchNestedRepoContent(path)

    navigator.push({
      screen: 'githubnative.Code',
      title: 'Code',
      animated: true
    })
  }

  render () {
    const { content } = this.props
    console.log(content)

    return (
      <View style={styles.list}>
        <ScrollView
          style={{flex: 1}}
        >
          {
            content.map(({ name, type, path }, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contentLink}
                onPress={() => this.goNested(path)}
              >
                <Image
                  style={styles.typeIcon}
                  source={
                    type === 'dir'
                    ? require('../../icons/dir@2x.png')
                    : require('../../icons/file@2x.png')
                  }
                />
                <Text style={styles.fileName}>{name}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

export default Code
