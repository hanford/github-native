import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

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
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  repo: {
    fontSize: 16
  }
})

export const RepoItem = (n) => (
  <View style={styles.item}>
    <Text style={styles.title}>{n.name}</Text>
    <Text style={{marginBottom: 10}}>{n.description}</Text>
    <View style={styles.row}>
      <Text style={styles.repo}>{n.language}</Text>
      <Text>⭐️ {n.stars}</Text>
    </View>
  </View>
)

export default RepoItem
