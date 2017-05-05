import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: 'left',
    padding: 20,
    fontWeight: 'bold',
    // borderWidth: 1
  }
})

export const Header = ({ children }) => (
  <View>
    <Text style={styles.header}>{children}</Text>
  </View>
)

export default Header
