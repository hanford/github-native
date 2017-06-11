import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'

import Account from './pages/account'
import Issues from './pages/issues'
import Notifications from './pages/notifications'
import Timeline from './pages/timeline'
import Repos from './pages/repos'
import Repo from './pages/repo'
import Trending from './pages/trending'
import Profile from './pages/profile'
import Search from './pages/search'
import Code from './pages/code'

export default function (store, Provider) {
  Navigation.registerComponent('githubnative.Account', () => Account, store, Provider)

  Navigation.registerComponent('githubnative.Profile', () => Profile, store, Provider)
  Navigation.registerComponent('githubnative.Notifications', () => Notifications, store, Provider)

  Navigation.registerComponent('githubnative.Repos', () => Repos, store, Provider)
  Navigation.registerComponent('githubnative.Repo', () => Repo, store, Provider)
  Navigation.registerComponent('githubnative.Search', () => Search, store, Provider)

  Navigation.registerComponent('githubnative.Issues', () => Issues, store, Provider)
  Navigation.registerComponent('githubnative.Timeline', () => Timeline, store, Provider)
  Navigation.registerComponent('githubnative.Trending', () => Trending, store, Provider)
  Navigation.registerComponent('githubnative.Code', () => Code, store, Provider)
}
