import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'

import Screens from './screens'

Screens()

Navigation.startSingleScreenApp({
  screen: {
    title: 'Login',
    screen: 'githubnative.Login'
  }
})
