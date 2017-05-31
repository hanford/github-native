import React, { PureComponent } from 'react'

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Linking,
  TouchableOpacity
} from 'react-native'

import { partial } from 'ap'
import fecha from 'fecha'

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
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  repo: {
    fontSize: 16
  }
})

export class Notifications extends PureComponent {

  state = {
    url: null
  }

  focusNotification = ({ url }) => {
    // Linking.openURL(`https://github.com/notifications`)
  }

  render () {
    // const { notifications, url } = this.state
    const { list, loading, fetchNotifications, navigator } = this.props

    navigator.setTabBadge({
      badge: list.length
    })

    if (!list) return null

    return (
      <View style={styles.list}>
        <ScrollView
          style={{height: 0}}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchNotifications}
              tintColor='black'
              title='Loading...'
              titleColor='black'
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor='#ffff00'
            />
          }
        >
          {
            list.map((n, index) => (
              <TouchableOpacity onPress={partial(this.focusNotification, n)} key={index}>
                <View style={styles.item}>
                  <Text style={styles.title}>{n.subject.title}</Text>
                  <Text style={styles.repo}>{n.repository.full_name}</Text>
                  <Text>{fecha.format(new Date(n.updated_at), 'M/D/YY h:mm A')} </Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

export default Notifications
