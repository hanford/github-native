import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
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

  visitProfile = () => {
    const { navigator } = this.props

    navigator.push({
      screen: 'githubnative.Profile',
      title: 'Profile',
      animated: true
    })

    navigator.toggleDrawer()
  }

  render () {
    const { token, login, logout } = this.props

    return (
      <View style={styles.login}>
        <Button
          onPress={this.visitProfile}
          title='Profile'
          style={{fontSize: 18, marginTop: 10}}
        />

        {
          token
          ? (
            <Button
              onPress={logout}
              style={{fontSize: 18, marginTop: 10}}
              color='red'
              title='Logout'
            />
          )
          : (
            <Button
              onPress={login}
              style={{fontSize: 18, marginTop: 10}}
              color='#007aff'
              title='Login'
            />
          )
        }
      </View>
    )
  }
}

export default Login
