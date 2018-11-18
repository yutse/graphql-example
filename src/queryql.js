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
                  <option value={''}>{'請選擇'}</option>
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
                  id: {!!item ? item.owner.id : '請選擇'}
                  <br />
                  name: {!!item ? item.owner.name : '請選擇'}
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export class ExchangeRates1 extends React.Component {
  state = { value: '' };

  render() {
    return (
      <div>
        <Query
          query={gql`
            {
              users {
                id
                name
                tasks {
                  id
                  title
                }
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            let item = data.users.find(x => x.id == this.state.value);
            return (
              <div>
                <select
                  onChange={e => {
                    console.log(e.target.value);
                    this.setState({ value: e.target.value });
                  }}
                >
                  <option value={''}>{'請選擇'}</option>
                  {data.users.map(({ id, name }, index) => (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
                <br />
                tasks:
                <br />
                {!!item
                  ? item.tasks.map(({ id, title, is_completed }, index) => (
                      <div key={index}>
                        id:{id}, title: {title}, {is_completed ? '已完成' : '未完成'}
                      </div>
                    ))
                  : '請選擇'}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
