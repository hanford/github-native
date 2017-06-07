import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import { configureStore } from './redux'
import { login } from './redux/user/actions'
import Screens from './screens'

const store = configureStore()

Screens(store, Provider)

// login first thing!
store.dispatch(login())

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Trending',
      screen: 'githubnative.Trending',
      title: 'Trending',
      icon: require('./icons/trending.png')
    },
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
      label: 'Issues',
      screen: 'githubnative.Issues',
      title: 'Issues',
      icon: require('./icons/issues.png')
    },
    {
      label: 'Search',
      screen: 'githubnative.Search',
      title: 'Search',
      icon: require('./icons/search.png')
    },
    {
      label: 'Account',
      screen: 'githubnative.Account',
      title: 'Account',
      icon: require('./icons/account.png')
    },
    {
      label: 'Repos',
      screen: 'githubnative.Repos',
      title: 'Repos',
      icon: require('./icons/repos.png')
    }
  ]
})

//
// drawer: {
//   left: {
//     screen: 'githubnative.Login'
//   }
// },
// tabsStyle: {
//   tabBarTranslucent: false
// }
