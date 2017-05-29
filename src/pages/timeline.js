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

import { fetchTimeline, getToken } from '../api/github-api'
import { Page } from '../components'

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

  state = {
    timeline: [],
    loading: true,
    url: null
  }

  componentDidMount () {
    this.getTimeline()
  }

  getTimeline = () => {
    this.setState({ loading: true })

    return fetchTimeline()
      .then(({ data }) => this.setState({ timeline: data, loading: false }))
      .catch(() => this.setState({ timeline: [], loading: false }))
  }

  onRefresh = () => {
    this.getTimeline()
  }

  render () {
    const { timeline, url } = this.state

    if (!timeline) return null

    return (
      <Page>
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
            timeline.map((ti, index) => {
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
