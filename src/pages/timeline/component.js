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

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  item: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
  },
  title: {
    fontSize: 14,
    overflow: 'hidden',
    width: '85%',
    display: 'flex',
    flexDirection: 'column'
  },
  ava: {
    height: 36,
    width: 36,
    borderRadius: 4
  },
  shadow: {
    borderRadius: 4,
    marginRight: 10,
  }
})

export class Timeline extends PureComponent {

  render () {
    const { list, loading, fetchTimeline } = this.props

    if (!list) return null

    return (
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
                <View style={styles.title}>
                  <Text>{fecha.format(new Date(ti.created_at), 'M/D/YY h:mm A')}</Text>
                  <Text>{parsed}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

export default Timeline
