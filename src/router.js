import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import { configureStore } from './redux'
import Screens from './screens'

const store = configureStore()

Screens(store, Provider)

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Timeline',
      screen: 'githubnative.Timeline',
      title: 'Timeline',
      icon: require('./icons/timeline.png')
    },
    {
      label: 'Notifications',
      screen: 'githubnative.Notifications',
      title: 'Notifications',
      icon: require('./icons/notifications.png')
    },
    {
      label: 'Trending',
      screen: 'githubnative.Trending',
      title: 'Trending',
      icon: require('./icons/trending.png')
    },
    {
      label: 'Issues',
      screen: 'githubnative.Issues',
      title: 'Issues',
      icon: require('./icons/issues.png')
    },
    {
      label: 'Repos',
      screen: 'githubnative.Repos',
      title: 'Repos',
      icon: require('./icons/repos.png')
    },
  ],
  drawer: { // optional, add this if you want a side menu drawer in your app
    left: { // optional, define if you want a drawer from the left
      screen: 'githubnative.Login', // unique ID registered with Navigation.registerScreen
      passProps: {} // simple serializable object that will pass as props to all top screens (optional)
    }
  },
  tabsStyle: { // optional, **iOS Only** add this if you want to style the tab bar beyond the defaults
    tabBarTranslucent: false
  }
})
