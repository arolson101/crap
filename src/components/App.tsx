import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';

export class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <Sidebar/>
        </View>
        <View style={styles.main}>
          <MainView/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  }
});
