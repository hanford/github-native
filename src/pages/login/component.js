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

  visitProfile = () => {
    const { navigator } = this.props

    navigator.showModal({
      screen: 'githubnative.Profile',
      title: 'Profile',
      animationType: 'slide-up'
    })
  }

  viewTrending = () => {
    const { navigator } = this.props

    navigator.showModal({
      screen: 'githubnative.Trending',
      title: 'Trending',
      animationType: 'slide-up'
    })
  }

  render () {
    const { token, login, logout } = this.props

    return (
      <View style={styles.login}>
        <Text style={{fontSize: 18, marginTop: 10}}>Github Native</Text>
        <Text style={{fontSize: 18, marginTop: 10}}>Version: 0.0.4</Text>
        <TouchableOpacity onPress={this.visitProfile}>
          <Text style={{fontSize: 18, marginTop: 10}}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.viewTrending}>
          <Text style={{fontSize: 18, marginTop: 10}}>Trending</Text>
        </TouchableOpacity>

        {
          token
          ? (
            <TouchableOpacity onPress={logout}>
              <Text style={{fontSize: 18, marginTop: 30, color: 'red'}}>Logout</Text>
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity onPress={login}>
              <Text style={{fontSize: 18, marginTop: 30, color: '#007aff', borderTopWidth: 1, borderColor: 'rgba(0,0,0,.1)'}}>Login</Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

export default Login
