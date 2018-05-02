import * as React from 'react'
import { View, StyleSheet } from 'react-native'

interface Props {
  sidebar: React.ReactElement<any>
  main: React.ReactElement<any>
}

export const AppContainer: React.SFC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {props.sidebar}
      </View>
      <View style={styles.main}>
        {props.main}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  sidebar: {
    flex: 1,
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    flexDirection: 'column'
  }
})
