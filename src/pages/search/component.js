import React, { PureComponent } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  SegmentedControlIOS,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'

import { RepoItem, UserItem } from '../../components'

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

  visitProfile = (login) => {
    const { fetchUser, navigator } = this.props

    fetchUser(login)

    navigator.push({
      screen: 'githubnative.Profile',
      title: login,
      animated: true
    })
  }

  visitRepo = repo => {
    const { navigator } = this.props

    navigator.push({
      screen: 'githubnative.Repo',
      title: repo.name || repo.full_name,
      animated: true
    })
  }

  renderResultList = () => {
    const { results, category, loading, navigator } = this.props

    if (!loading && !results.length) return

    console.log(results)

    if (loading) {
      return (
        <ActivityIndicator />
      )
    }

    if (category === 0) {
      console.log('at user')
      return (
        <ScrollView>
          {
            results.map((n, index) => (
              <TouchableOpacity key={index} onPress={() => this.visitProfile(n.login)}>
                <UserItem
                  user={n}
                />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      )
    } else {
      return (
        <ScrollView>
          {
            results.map((n, index) => (
              <TouchableOpacity onPress={() => this.visitRepo(n)} key={index}>
                <RepoItem
                  repo={n}
                />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      )
    }
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

        <View style={{marginTop: 10}}>
          {this.renderResultList()}
        </View>
      </View>
    )
  }
}

export default Search
