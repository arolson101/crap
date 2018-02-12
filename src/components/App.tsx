import * as React from 'react';
import { View, Text } from 'react-native';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { NavigationScreenComponent, NavigationScreenOptions } from 'react-navigation';

const arr: number[] = [];
for (let i = 0; i < 1000; i++) {
  arr[i] = i;
}

export class Home extends React.Component {
  static navigationOptions = {
    title: 'Home title',
  };

  render() {
    return (
      <View>
        <Text>Home</Text>
        {arr.map((i) =>
          <div key={i}>
            <label>label {i}</label>
            <input type="text" style={{width: 100}}/>
            <button>...</button> <button>go</button>
          </div>
        )}
      </View>
    );
  }
}

export class About extends React.Component {
  static navigationOptions = {
    title: 'About',
  };

  render() {
    return <View><Text>About</Text></View>;
  }
}

const Page = <T extends {}>(Screen: NavigationScreenComponent<T, NavigationScreenOptions>) =>
  ({ children, ...props }: React.Props<T>) => {
    const navigationOptions: any = Screen.navigationOptions && (typeof Screen.navigationOptions === 'function'
      ? null
      : Screen.navigationOptions
    );
    return (
      <View>
        <Text>{navigationOptions!.title}</Text>
        <Screen {...props as T}>{children}</Screen>
      </View>
    );
  };

const HomePage = Page(Home);
const AboutPage = Page(About);

export class App extends React.Component {
  render() {
    return (
      <Router>
        <View>
          <View>
            <Link to="/">home</Link>
            <Link to="/about?1">about 1</Link>
            <Link to="/about?2">about 2</Link>
          </View>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
        </View>
      </Router>
    );
  }
}
