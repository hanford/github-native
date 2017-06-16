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
    flex: 1
  }
})

export class EditTrending extends PureComponent {

  state = {
    language: '',
    time: ''
  }

  render () {
    // const { list, loading, fetchRepos } = this.props

    return (
      <View style={styles.list}>
        <Picker
          selectedValue={this.state.language}
          onValueChange={itemValue => this.setState({time: itemValue})}>
          <Picker.Item label="All Time" value="all" />
          <Picker.Item label="Last Week" value="week" />
          <Picker.Item label="Last Month" value="month" />
          <Picker.Item label="Last Year" value="year" />
        </Picker>

        <Picker
          selectedValue={this.state.language}
          onValueChange={itemValue => this.setState({language: itemValue})}>

          <Picker.Item label="Any" value="any" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Swift" value="swift" />
          <Picker.Item label="Python" value="python" />
          <Picker.Item label="Java" value="java" />
        </Picker>

        <Button
          title='Cancel'
          color='red'
        />

        <Button
          title='Submit'
        />

      </View>
    )
  }
}

export default EditTrending
