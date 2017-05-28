import React, { PureComponent } from 'react'
import { StyleSheet, TextInput, View, Text, Button } from 'react-native'
import OAuthManager from 'react-native-oauth'
import { Navigation } from 'react-native-navigation'

import config from '../../config.json'
import { setToken } from '../api/github-api'
import { Header, Page } from '../components'

const manager = new OAuthManager('githubnative')
manager.configure(config)

const styles = StyleSheet.create({
  login: {
    margin: 20
  },
  pwInput: {
    margin: 20
  }
})

export class Login extends PureComponent {
  state = {
    token: null,
  }

  beginAuth = () => {
    manager.authorize('github', {scopes: 'user repo notifications'})
      .then(({ response }) => {
        const token = response.credentials.accessToken

        setToken(token)
        this.setState({ token })


        this.props.navigator.push({
          screen: 'githubnative.Swiper',
          title: 'Swiper'
        })
      })
      .catch(err => console.log('There was an error'))
  }

  removeAuth = () => {
    console.log(this.props)
    debugger

    manager.deauthorize('github')
    this.setState({ token: null })

    history.push('/')
  }

  render () {
    const { token } = this.state

    return (
      <Page>
        <Header>Login</Header>
        <View style={styles.login}>
          <Button
            onPress={this.beginAuth}
            title='Login'
          />

          <Button
            onPress={this.removeAuth}
            title='Logout'
            color='red'
          />
        </View>
      </Page>
    )
  }
}

export default Login
