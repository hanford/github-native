import React, { PureComponent } from 'react'
import { StyleSheet, TextInput, View, Text, Button } from 'react-native'
import OAuthManager from 'react-native-oauth'
import { Navigation } from 'react-native-navigation'

import config from '../../../config.json'
import { setToken } from '../../api/github-api'
import { Header, Page } from '../../components'

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
    token: null
  }

  beginAuth = () => {
    manager.authorize('github', {scopes: 'user repo notifications'})
      .then(({ response }) => {
        const token = response.credentials.accessToken

        this.props.setToken(token)
        setToken(token)
        this.setState({ token })

      })
      .catch(err => console.log('There was an error'))
  }

  removeAuth = () => {
    manager.deauthorize('github')
    this.setState({ token: null })

    this.props.navigator.resetTo({
      screen: 'githubnative.Login',
      title: 'githubnative',
      animated: true
    })
  }

  render () {
    const { token } = this.state

    return (
      <Page>
        <Header>Login</Header>
        <View style={styles.login}>
          {
            token
            ? (
              <Button
                onPress={this.removeAuth}
                title='Logout'
                color='red'
              />
            )
            : (
              <Button
                onPress={this.beginAuth}
                title='Login'
              />
            )
          }
        </View>
      </Page>
    )
  }
}

export default Login
