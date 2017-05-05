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

  state = {
    username: null,
    password: null
  }

  render () {
    return (
      <Page>
        <Header>Login</Header>
        <TextInput
          {...this.props}
          placeholder='Username'
          value={this.state.setUsername}
          editable={true}
          returnKeyType='next'
          style={{height: 40, borderColor: '#DDD', borderWidth: 1, padding: 8}}
          onChangeText={(username) => this.setState({ username })}
        />
        <TextInput
          {...this.props}
          style={styles.pwInput}
          value={this.state.setUsername}
          placeholder='Password'
          editable={true}
          returnKeyType='go'
          style={[{height: 40, borderColor: '#DDD', borderWidth: 1, padding: 8}, styles.pwInput]}
          onChangeText={(password) => this.setState({ password })}
        />
        <View style={styles.login}>
          <Button
            onPress={() => {}}
            title='Login'
          />
        </View>
      </Page>
    )
  }
}

export default Login

