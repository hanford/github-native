import React, { PureComponent } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Animated
} from 'react-native'
import { partial } from 'ap'

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  issue: {
    fontSize: 16,
    color: '#00bf8b',
    fontWeight: 'bold',
    textAlign: 'right',
    display: 'flex',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    flex: 1,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export class Issues extends PureComponent {
  state = {
    scaleValue: new Animated.Value(1),
  }

  constructor () {
    super()

    this.runAnimation()
  }

  runAnimation = () => {
    this.state.scaleValue.setValue(1)

    Animated.sequence([
      Animated.timing(this.state.scaleValue, {
        toValue: 2,
        duration: 500,
      }),
      Animated.timing(this.state.scaleValue, {
        toValue: 1.0,
        duration: 500,
      })
    ]).start(() => this.runAnimation())
  }

  render () {
    const { list, loading, fetchIssues } = this.props
    const { scaleValue } = this.state
    console.log(scaleValue)


    if (!list) return null

    return (
      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchIssues}
            tintColor='black'
            title='Loading...'
            titleColor='black'
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor='#ffff00'
          />
        }
      >
        {
          list.map((n, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.item}>
                <Text style={styles.title}>{n.title}</Text>
                <View style={styles.row}>
                  <Text>Assigned: {n.assignee.login}</Text>
                  <View>
                  <Animated.Text
                    style={{
                      color: '#00bf8b',
                      transform: [
                        {scale: scaleValue}
                      ]
                    }}
                  >
                    {n.state === 'open' ? '•' : 'x'}
                  </Animated.Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    )
  }
}

export default Issues
