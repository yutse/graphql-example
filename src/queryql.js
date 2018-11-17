import gql from 'graphql-tag';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import React from 'react';

const ADD_TODO = gql`
  mutation NewTask($title: String!) {
    newTask(title: $title) {
      title
    }
  }
`;

// const AddTodo = () => {
//   let input;

//   return (
//     <Mutation mutation={ADD_TODO}>
//       {(newTask, { data }) => (
//         <div>
//           <form
//             onSubmit={e => {
//               e.preventDefault();
//               newTask({ variables: { title: input.value } });
//               input.value = '';
//             }}
//           >
//             <input
//               ref={node => {
//                 input = node;
//               }}
//             />
//             <button type="submit">Add Todo</button>
//           </form>
//         </div>
//       )}
//     </Mutation>
//   );
// };

export const ExchangeRates = () => (
  <Query
    query={gql`
      {
        books {
          title
          author
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.books.map(({ title, author }, index) => (
        <div key={index}>
          <p style={{ paddingLeft: '15px', textAlign: 'left' }}>
            <br />
            {`title: ${title}`}
            <br />
            {`author: ${author}`}
          </p>
        </div>
      ));
    }}
  </Query>
);
