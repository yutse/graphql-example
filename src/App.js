import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import { ExchangeRates } from './queryql';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://ee1cfce1.ngrok.io/graphql/',
  // uri: 'http://localhost:4000/',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <p>
            React Graphql 起手式
          </p>
          <div>
            <ExchangeRates />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
