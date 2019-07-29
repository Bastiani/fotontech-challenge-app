import { commitMutation, graphql } from 'react-relay';

import Environment from '../../../Environment';

const mutation = graphql`
  mutation ProductEditMutation($input: ProductEditInput!) {
    ProductEditMutation(input: $input) {
      product {
        id
        title
        description
        active
      }
    }
  }
`;

function commit(input, onCompleted, onError) {
  return commitMutation(Environment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  });
}

export default { commit };
