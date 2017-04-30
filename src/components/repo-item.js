import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  item: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    fontSize: 24
  },
  repo: {
    fontSize: 16,
    color: '#b3b6bf'
  }
})

export const RepoItem = (n) => (
  <View style={styles.item}>
    <Text style={styles.title}>{n.name}</Text>
    <Text style={styles.repo}>{n.language}</Text>
    <Text>{n.description}</Text>
    <Text>⭐️ {n.stars}</Text>
  </View>
)

export default RepoItem
