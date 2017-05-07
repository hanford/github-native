import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper-grid'
import OAuthManager from 'react-native-oauth'

import { Login, Notifications, Repos, RepoSearch, Issues } from './pages'
import config from '../config.json'
import { setToken } from './api/github-api'

const manager = new OAuthManager('githubnative')

manager.configure(config)


export default class App extends PureComponent {
  state = {
    token: null,
  }

  beginAuth = () => {
    manager.authorize('github', {scopes: 'user repo'})
      .then(({ response }) => {
        const token = response.credentials.accessToken

        setToken(token)
        this.setState({ token })
      })
      .catch(err => console.log('There was an error'))
  }

  render () {
    const { token } = this.state

    const app = (
      <Swiper
        loop={false}
        bounces={true}
        showsButtons={false}
        index={1}
        activeDotColor='black'
      >
        <Login token={token} beginAuth={this.beginAuth} />
        <Notifications />
        <Issues />
        <Repos />
      </Swiper>
    )

    return token ? app : (<Login beginAuth={this.beginAuth} token={token} />)
  }
}
