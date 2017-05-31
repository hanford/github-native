import React, { PureComponent } from 'react'
import sortOn from 'sort-on'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { RepoItem } from '../../components'

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  topSection: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    backgroundColor: '#fafbfc',
    padding: 10
  },
  row: {
    flexDirection: 'row'
  },
  name: {
    fontSize: 16,
    color: 'gray'
  },
  sub: {
    fontSize: 16
  },
  statItem: {
    alignItems: 'center'
  },
  statRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 1
  },
  closeButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export class Profile extends PureComponent {

  closeModal = () => {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    })
  }

  render () {
    const { profile } = this.props

    const {
      name,
      login,
      company,
      location,
      email,
      blog,
      bio,
      public_repos,
      followers,
      following
    } = profile

    return (
      <View
        style={styles.list}
      >
        <View style={styles.topSection}>
          <View style={styles.row}>
            <Image
              style={{width: 110, height: 110, borderRadius: 8, marginRight: 10}}
              source={{uri: profile.avatar_url}}
            />

            <View>
              <Text style={{fontSize: 18}}>{name}</Text>
              <Text style={{color: 'gray'}}>{login}</Text>
              <Text style={styles.sub}>{company}</Text>
              <Text style={styles.sub}>{location}</Text>
              <Text style={styles.sub}>{email}</Text>
            </View>
          </View>

          <Text style={{paddingTop: 10}}>{blog}</Text>
          <Text style={{paddingTop: 10}}>{bio}</Text>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={{fontWeight: 'bold'}}>{public_repos}</Text>
            <Text>Repos</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={{fontWeight: 'bold'}}>{followers}</Text>
            <Text>Followers</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={{fontWeight: 'bold'}}>{following}</Text>
            <Text>Following</Text>
          </View>
        </View>

        <TouchableOpacity onPress={this.closeModal} style={styles.closeButton}>
          <Text style={{color: 'white'}}>Close</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Profile
