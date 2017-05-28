import React, { PureComponent } from 'react'

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl
} from 'react-native'

import fecha from 'fecha'
import { compile } from 'parse-github-event'

import { fetchTimeline, getToken } from '../api/github-api'
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
    fontSize: 14
  },
  repo: {
    fontSize: 16
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
  }

  onRefresh = () => {
    this.getTimeline()
  }

  render () {
    const { timeline, url } = this.state

    if (!timeline) return null

    return (
      <Page>
        <Header>Timeline</Header>

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
