import React, { PureComponent } from 'react'
import { StyleSheet, TextInput, View, Text, ScrollView, RefreshControl } from 'react-native'
import { partial } from 'ap'

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  issue: {
    fontSize: 16,
    color: '#00bf8b',
    fontWeight: 'bold',
    paddingRight: 10
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10
  }
})

export class Issues extends PureComponent {
  render () {
    const { list, loading, fetchIssues } = this.props

    return (
      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchIssues}
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
            <View style={styles.item} key={index}>
              <Text style={styles.issue}>{n.state === 'open' ? '◉' : 'x'}</Text>
              <View style={{display: 'flex'}}>
                <Text style={styles.title}>{n.title}</Text>
                <Text>Assigned: {n.assignee.login}</Text>
              </View>
            </View>
          ))
        }
      </ScrollView>
    )
  }
}

export default Issues
