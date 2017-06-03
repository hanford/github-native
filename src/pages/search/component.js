import React, { PureComponent } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  RefreshControl,
  SegmentedControlIOS,
} from 'react-native'

import { RepoItem } from '../../components'

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'column'
  },
  inputWrapper: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    marginBottom: 8
  },
  searchInput: {
    padding: 8,
    height: 40
  }
})

export class Search extends PureComponent {
  state = {
    selectedIndex: 1,
    text: ''
  }

  render () {
    const {
      text,
      category,
      setSearchText,
      setSearchCategory,
      searchUsersOrRepos,
    } = this.props

    return (
      <View style={styles.list}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Search'
            style={styles.searchInput}
            onChangeText={text => setSearchText(text)}
            onSubmitEditing={searchUsersOrRepos}
            value={text}
            returnKeyType='search'
            enablesReturnKeyAutomatically={true}
            autoFocus={true}
            editable={true}
          />
        </View>

        <SegmentedControlIOS
          values={['Users', 'Repos']}
          selectedIndex={category}
          style={{marginLeft: 8, marginRight: 8}}
          onChange={({ nativeEvent: { selectedSegmentIndex } }) => setSearchCategory(selectedSegmentIndex)}
          tintColor='#373838'
        />
      </View>
    )
  }
}

export default Search
