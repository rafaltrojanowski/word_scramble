import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game';
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
  uri: 'http://localhost:3000/graphql'
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

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <div style={styles.container}>
            <Query query={GET_RANDOM_WORD}>
              {({ loading, error, data }) => {
                if (error) return (<p>Error</p>)
                if (loading || !data) return (<p>Fetching</p>)
                let { word } = data
                return <Game word={word.contentEn}></Game>
              }}
            </Query>
          </div>
        </Provider>
      </ApolloProvider>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#ffef96',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    position: 'absolute',
    top:0,
    bottom:0,
    right:0,
    left:0,
  },
}

export default App;
