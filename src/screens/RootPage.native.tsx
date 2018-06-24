import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { MainView } from './MainView'
import { Sidebar } from './Sidebar'

export const RootPage: React.SFC = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar />
      </View>
      <View style={styles.main}>
        <MainView />
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
