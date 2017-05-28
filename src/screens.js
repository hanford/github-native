import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Login, Swiper, Notifications, Repos, Issues, Timeline } from './pages'

export default function () {
  Navigation.registerComponent('githubnative.Login', () => Login)
  Navigation.registerComponent('githubnative.Swiper', () => Swiper)

  Navigation.registerComponent('githubnative.Notifications', () => Notifications)
  Navigation.registerComponent('githubnative.Repos', () => Repos)
  // Navigation.registerComponent('githubnative.RepoSearch', () => RepoSearch)
  Navigation.registerComponent('githubnative.Issues', () => Issues)
  Navigation.registerComponent('githubnative.Timeline', () => Timeline)
}
