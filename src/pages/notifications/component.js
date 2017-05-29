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
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
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
    const { list, loading, fetchNotifications } = this.props

    return (
      <ScrollView
        style={styles.list}
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
    )
  }
}

export default Notifications
