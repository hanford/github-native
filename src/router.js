import React from 'react'
import { View } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'

import { Login, Swiper } from './pages'

export default () => (
  <NativeRouter>
    <View style={{flex: 1}}>
      <Route exact path='/' component={Login} />
      <Route exact path='/main' component={Swiper} />
    </View>
  </NativeRouter>
)
