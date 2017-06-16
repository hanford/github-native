import React, { PureComponent } from 'react'
import sortOn from 'sort-on'

import {
  StyleSheet,
  View,
  Text,
  Button,
  Picker
} from 'react-native'

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

export class EditTrending extends PureComponent {

  dismissModal = () => {
    const { navigator } = this.props

    navigator.dismissModal({
      animationType: 'slide-down'
    })
  }

  setTime = value => {
    this.props.setTime(value)
  }

  setLanguage = value => {
    this.props.setLanguage(value)
  }

  render () {
    const { time, language } = this.props

    return (
      <View style={styles.list}>
        <View>
          <Picker
            selectedValue={time}
            onValueChange={this.setTime}>
            <Picker.Item label='Last Day' value='2' />
            <Picker.Item label='Last Week' value='8' />
            <Picker.Item label='Last Month' value='31' />
            <Picker.Item label='Last Year' value='365' />
          </Picker>

          <Picker
            selectedValue={language}
            onValueChange={this.setLanguage}>
            <Picker.Item label='Any' value='any' />
            <Picker.Item label='JavaScript' value='js' />
            <Picker.Item label='Top Golang' value='go' />
            <Picker.Item label='Top iOS' value='ios' />
            <Picker.Item label='Top Python' value='python' />
            <Picker.Item label='Top CSS' value='css' />
          </Picker>
        </View>

        <Button
          title='Close'
          color='red'
          style={{height: 80}}
          onPress={this.dismissModal}
        />
      </View>
    )
  }
}

export default EditTrending
