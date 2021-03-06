import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './components/game';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import { Query } from "react-apollo";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: Expo.Constants.manifest.extra.graphqlEndpoint
})
const client = new ApolloClient({
  cache,
  link
})

const GET_RANDOM_WORD = gql`
  query {
    word{
      id
      contentEn
    }
  }
`;

const intitialState = {
  cursorPosition: -1,
  previous: [],
  scrambledWord: null
}

const reducer = (state = intitialState, action) => {
  switch(action.type) {
    case 'REMOVE_WORD':
      const previous = state.previous
      const previousWord = previous[state.cursorPosition - 1].split(",")
      const newPrevious = previous.slice(0, previous.length - 1)

      return Object.assign({}, state, {
        scrambledWord: previousWord,
        cursorPosition: state.cursorPosition - 1,
        previous: newPrevious
      })
     case 'ADD_WORD':
      return Object.assign({}, state, {
        previous: [...state.previous, `${action.scrambledWord}`], // TODO: somehow it doesn't work when we store letters in array object so instead we store comma separated letters as String
        scrambledWord: action.scrambledWord,
        cursorPosition: state.cursorPosition + 1
      })
    default:
      return state
  }
}

const store = createStore(reducer, composeWithDevTools())

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <View style={styles.container}>
            <Query query={GET_RANDOM_WORD}>
              {({ loading, error, data }) => {
                if (error) return (<Text>Error</Text>)
                if (loading || !data) return (<Text>Fetching</Text>)
                let { word } = data
                return <Game word={word.contentEn}></Game>
              }}
            </Query>
          </View>
        </Provider>
      </ApolloProvider>
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
