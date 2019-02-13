import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './components/game';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const intitialState = {
  cursorPosition: -1,
  previous: [],
  scrambledWord: null
}

const reducer = (state = intitialState, action) => {
  switch(action.type) {
    case 'DECREASE_POSITION':
      const previousWord = state.previous[state.cursorPosition - 2]
      const newPrevious = state.previous.slice(0, state.previous.length - 1)

      return { 
        scrambledWord: previousWord,
        cursorPosition: state.cursorPosition - 1,
        previous: newPrevious
      }
     case 'UPDATE_HISTORY':
      const word = action.scrambledWord
      return {
        scrambledWord: word,
        cursorPosition: state.cursorPosition + 1,
        //previous: [...state.previous, `${word}${state.cursorPosition + 1}`]
        previous: [...state.previous, [word]]
      }
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
