import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './components/game';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Game word='wannaporn'></Game>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
