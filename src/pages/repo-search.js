// import React, { PureComponent } from 'react'
// import { StyleSheet, TextInput, View, Text } from 'react-native'

// import { searchRepos } from '../api/github-api'

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20
//   },
//   header: {
//     fontSize: 30,
//     textAlign: 'left',
//     marginTop: 10,
//     marginBottom: 10,
//     fontWeight: 'bold'
//   },
// })

// export class RepoSearch extends PureComponent {

//   state = {
//     search: null
//   }

//   searchRepo = () => {
//     const { search } = this.state
//     searchRepos(search)
//   }

//   render () {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Repo Search</Text>
//         <TextInput
//           placeholder='Repo Search'
//           value={this.state.search}
//           editable={true}
//           returnKeyType='search'
//           onSubmitEditing={this.searchRepo}
//           keyboardAppearance='dark'
//           style={{height: 40, borderColor: '#DDD', borderWidth: 1, padding: 8, marginTop: 10}}
//           onChangeText={(search) => this.setState({ search })}
//         />

//       </View>
//     )
//   }
// }

// export default RepoSearch

