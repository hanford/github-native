import React, { PureComponent } from 'react'

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native'

import fecha from 'fecha'
import { compile } from 'parse-github-event'

import { Page } from '../../components'

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  item: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  title: {
    fontSize: 14,
    overflow: 'hidden',
    width: '85%'
  },
  repo: {
    fontSize: 16
  },
  ava: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  shadow: {
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    marginRight: 10,
  }
})

export class Timeline extends PureComponent {

  render () {
    const { list, loading, fetchTimeline } = this.props

    if (!list) return null

    return (
      <Page>
        <ScrollView
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchTimeline}
              tintColor='black'
              title='Loading...'
              titleColor='black'
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor='#ffff00'
            />
          }
        >
          {
            list && list.map((ti, index) => {
              const parsed = compile(ti)

              return (
                <View style={styles.item} key={index}>
                  <View style={styles.shadow}>
                    <Image
                      source={{uri: ti.actor.avatar_url}}
                      style={styles.ava}
                      />
                  </View>
                  <Text style={styles.title}>{parsed} {fecha.format(new Date(ti.created_at), 'M/D/YY h:mm A')}</Text>
                </View>
              )
            })
          }
        </ScrollView>
      </Page>
    )
  }
}

export default Timeline
