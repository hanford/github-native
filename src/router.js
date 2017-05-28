import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'

import Screens from './screens'

Screens()

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Login',
      screen: 'githubnative.Login',
      title: 'Login'
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
      label: 'Repos',
      screen: 'githubnative.Repos',
      title: 'Repos',
      icon: require('./icons/repos.png')
    },
  ]
})
