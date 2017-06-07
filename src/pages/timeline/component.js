import React, { PureComponent } from 'react'

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity
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

  // static navigatorButtons = {
  //   rightButtons: [
  //     {
  //       title: 'Profile',
  //       id: 'profile'
  //     }
  //   ]
  // }
  //
  // constructor(props) {
  //   super(props)
  //
  //   this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  // }


  visitProfile = ({ login }) => {
    const { fetchUser, navigator } = this.props

    fetchUser(login)

    navigator.push({
      screen: 'githubnative.Profile',
      title: login,
      animated: true
    })
  }

  visitRepo = ({ repo }) => {
    const { fetchRepo, navigator } = this.props
    fetchRepo(repo.name)

    navigator.push({
      screen: 'githubnative.Repo',
      title: repo.name,
      animated: true
    })
  }

  // onNavigatorEvent = ({ type, id }) => {
  //   const { user } = this.props
  //
  //   if (type === 'NavBarButtonPress') {
  //     if (id === 'profile') {
  //       this.visitProfile({ login: user })
  //     }
  //   }
  // }

  render () {
    const { list, loading, fetchTimeline } = this.props

    return (
      <View style={styles.list}>
        <ScrollView
          style={{height: 0}}
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
            list.map((ti, index) => {
              const parsed = compile(ti)

              return (
                <View style={styles.item} key={index}>
                  <View style={styles.shadow}>
                  <TouchableOpacity onPress={() => this.visitProfile(ti.actor)}>
                    <Image
                      source={{uri: ti.actor.avatar_url}}
                      style={styles.ava}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => this.visitRepo(ti)}>
                    <View style={styles.title}>
                      <Text>{fecha.format(new Date(ti.created_at), 'M/D/YY h:mm A')}</Text>
                      <Text>{parsed}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

export default Timeline
