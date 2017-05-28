import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export const Page = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default Page
