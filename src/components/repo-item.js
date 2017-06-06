import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  item: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  repo: {
    fontSize: 16
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  star: {
    height: 15,
    width: 15,
    marginRight: 5
  }
})

export const RepoItem = ({ repo, navigator, setRepo }) => {
  console.log(navigator)
  const visitRepo = () => {
    navigator.push({
      screen: 'githubnative.Repo',
      title: repo.name || repo.full_name,
      animated: true
    })
  }

  return (
    <TouchableOpacity onPress={visitRepo}>
      <View style={styles.item}>
        <Text style={styles.title}>{repo.name}</Text>
        <Text style={{marginBottom: 10}}>{repo.description}</Text>
        <View style={styles.row}>
          <Text style={styles.repo}>{repo.language}</Text>
          <View style={styles.starRow}>
            <Image source={require('../icons/star@2x.png')} style={styles.star} />
            <Text>{repo.stargazers_count}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RepoItem
