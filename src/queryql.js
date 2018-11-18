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
        tasks {
          id
          title
          is_completed
          owner {
            id
            name
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.tasks.map(({ id, title, is_completed, owner }, index) => (
        <div key={index}>
          <p style={{ paddingLeft: '15px', textAlign: 'left' }}>
            {`id: ${id}`}
            <br />
            {`title: ${title}`}
            <br />
            {`is_completed: ${is_completed}`}
            <br />
            {`owner.id: ${owner.id}`}
            <br />
            {`owner.name: ${owner.name}`}
          </p>
        </div>
      ));
    }}
  </Query>
);
