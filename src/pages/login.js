import React, { PureComponent } from 'react'
import { StyleSheet, TextInput, View, Text, Button } from 'react-native'

import { Header, Page } from '../components'

const styles = StyleSheet.create({
  login: {
    margin: 20
  },
  pwInput: {
    margin: 20
  }
})

export class Login extends PureComponent {

  render () {
    const { beginAuth, token, removeAuth } = this.props
    return (
      <Page>
        <Header>Login</Header>
        <View style={styles.login}>
          <Button
            onPress={beginAuth}
            title='Login'
          />
          <Button
            onPress={removeAuth}
            title='Logout'
            color='red'
          />
        </View>
      </Page>
    )
  }
}

export default Login

