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

export class ExchangeRates extends React.Component {
  state = { value: '' };

  render() {
    return (
      <div>
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

            let item = data.tasks.find(x => x.id == this.state.value);
            return (
              <div>
                <select
                  onChange={e => {
                    console.log(e.target.value);
                    this.setState({ value: e.target.value });
                  }}
                >
                  {data.tasks.map(({ id, title, is_completed, owner }, index) => (
                    <option key={index} value={id}>
                      {title}
                    </option>
                  ))}
                </select>
                <br />
                owner:
                <br />
                <div>
                  id: {!!item ? item.owner.id : 'none'}
                  <br />
                  name: {!!item ? item.owner.name : 'none'}
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

// export const ExchangeRates = () => (

// );
