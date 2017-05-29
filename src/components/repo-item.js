import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

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

export const RepoItem = (n) => (
  <View style={styles.item}>
    <Text style={styles.title}>{n.name}</Text>
    <Text style={{marginBottom: 10}}>{n.description}</Text>
    <View style={styles.row}>
      <Text style={styles.repo}>{n.language}</Text>
      <View style={styles.starRow}>
        <Image source={require('../icons/star@2x.png')} style={styles.star} />
        <Text>{n.stars}</Text>
      </View>
    </View>
  </View>
)

export default RepoItem
