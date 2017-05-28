import React, { PureComponent } from 'react'
import { StyleSheet, TextInput, View, Text, ScrollView, RefreshControl, Linking, TouchableOpacity } from 'react-native'
import { partial } from 'ap'
import fecha from 'fecha'

import { fetchNotifications, getToken } from '../api/github-api'
import { Header, Page } from '../components'

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
    notifications: [],
    loading: true,
    url: null
  }

  componentDidMount () {
    this.getNotifications()
  }

  getNotifications = () => {
    this.setState({ loading: true })

    return fetchNotifications()
      .then(({ data }) => this.setState({ notifications: data, loading: false }))
  }

  onRefresh = () => {
    this.getNotifications()
  }

  focusNotification = ({ url }) => {
    // Linking.openURL(`https://github.com/notifications`)
  }

  render () {
    const { notifications, url } = this.state

    if (!notifications) return null

    return (
      <Page>
        <Header>Notifications ({notifications.length})</Header>

        <ScrollView
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.onRefresh}
              tintColor='black'
              title='Loading...'
              titleColor='black'
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor='#ffff00'
            />
          }
        >
          {
            notifications.map((n, index) => (
              <TouchableOpacity onPress={partial(this.focusNotification, n)} key={index} >
                <View style={styles.item}>
                  <Text style={styles.title}>{n.subject.title}</Text>
                  <Text style={styles.repo}>{n.repository.full_name}</Text>
                  <Text>{fecha.format(new Date(n.updated_at), 'M/D/YY h:mm A')} </Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </Page>
    )
  }
}

export default Notifications
