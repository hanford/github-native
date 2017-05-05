import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  item: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  repo: {
    fontSize: 16
  }
})

export const RepoItem = (n) => (
  <View style={styles.item}>
    <Text style={styles.title}>{n.name}</Text>
    <Text>{n.description}</Text>
    <Text>⭐️ {n.stars} - <Text style={styles.repo}>{n.language}</Text></Text>
  </View>
)

export default RepoItem
