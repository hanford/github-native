import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper-grid'

import { Login, Notifications, Repos, RepoSearch, Issues } from './pages'

export default class App extends React.Component {

  render () {
    return (
      <Swiper
        loop={false}
        bounces={true}
        showsButtons={false}
        index={1}
        activeDotColor='black'
      >
        <Login />
        <Notifications />
        <Issues />
        <Repos />
      </Swiper>
    )
  }
}
