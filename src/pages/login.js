import React, { PureComponent } from 'react'
import { StyleSheet, TextInput, View, Text, Button } from 'react-native'
import OAuthManager from 'react-native-oauth'
import config from '../../config.json'

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
    console.log('begin auth!')
    console.log('begin auth!##################################')

    manager.authorize('github', {scopes: 'user repo notifications'})
      .then(({ response }) => {
        console.log('Your users ID', response)
        this.setState({token: response.credentials.accessToken})
      })
      .catch(err => console.log('There was an error'))
  }

  render () {
    return (
      <Page>
        <Header>Login</Header>
        <Text>{this.state.token}</Text>

        <View style={styles.login}>
          <Button
            onPress={this.beginAuth}
            title='Login'
          />
        </View>
      </Page>
    )
  }
}

export default Login

