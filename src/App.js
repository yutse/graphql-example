import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';

// const link = new HttpLink({ uri: 'http://3349b50b.ngrok.io/' });
const client = new ApolloClient({
  uri: 'http://3349b50b.ngrok.io/graphql/',
  // uri: 'http://localhost:4000/',
});

const ADD_TODO = gql`
  mutation NewTask($title: String!) {
    newTask(title: $title) {
      title
    }
  }
`;

const AddTodo = () => {
  let input;

  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { title: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        tasks {
          id
          title
          is_completed
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      console.log(data);

      // return <div>123</div>;
      return data.tasks.map(({ id, title , is_completed}, index) => (
        <div key={index}>
          <p style={{ paddingLeft: '15px', textAlign: 'left' }}>
          {`id: ${id}`}
          <br/>
          {`title: ${title}`}
          <br/>
          {`isCompleted: ${is_completed}`}
          </p>
        </div>
      ));
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React Graphql 起手式</h1>
          </header>
          <div>
            <ExchangeRates />
          </div>
          <div>
            <AddTodo/>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
