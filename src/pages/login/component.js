import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'

const styles = StyleSheet.create({
  login: {
    margin: 20,
    marginBottom: 60,
    justifyContent: 'flex-end',
    flex: 1
  }
})

export class Login extends PureComponent {

  render () {
    const { token, login, logout } = this.props

    return (
      <View style={styles.login}>
        <Text>Github Native</Text>
        <Text>Version: 0.0.4</Text>
        {
          token
          ? (
            <TouchableOpacity onPress={logout}>
              <Text style={{fontSize: 18, marginTop: 30}}>Logout</Text>
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity onPress={login}>
              <Text style={{fontSize: 18, marginTop: 30}}>Login</Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

export default Login
