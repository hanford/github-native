import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Repos } from './pages'

import Login from './pages/login'
import Issues from './pages/issues'
import Notifications from './pages/notifications'
import Timeline from './pages/timeline'

export default function (store, Provider) {
  Navigation.registerComponent('githubnative.Login', () => Login, store, Provider)
  // Navigation.registerComponent('githubnative.Swiper', () => Swiper)

  Navigation.registerComponent('githubnative.Notifications', () => Notifications, store, Provider)
  Navigation.registerComponent('githubnative.Repos', () => Repos, store, Provider)
  // Navigation.registerComponent('githubnative.RepoSearch', () => RepoSearch)
  Navigation.registerComponent('githubnative.Issues', () => Issues, store, Provider)
  Navigation.registerComponent('githubnative.Timeline', () => Timeline, store, Provider)
}
