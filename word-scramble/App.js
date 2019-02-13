import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './components/game';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
 
const intitialState = {
  cursorPosition: 0
}

const reducer = (state = intitialState, action) => {

  switch(action.type) {
    case 'INCREASE_POSITION':
      return { cursorPosition: state.cursorPosition + 1 }
    case 'DECREASE_POSITION':
      return { cursorPosition: state.cursorPosition - 1 }
  }

  return state
}
 
const store = createStore(reducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}> 
        <View style={styles.container}>
          <Game word='wannaporn'></Game>
        </View>
      </Provider> 
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
