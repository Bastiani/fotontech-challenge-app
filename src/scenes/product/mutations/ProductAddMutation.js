import { commitMutation, graphql } from 'react-relay';

import Environment from '../../../Environment';
import { connectionUpdater, ROOT_ID } from '../../../relay/mutationUtils';

const mutation = graphql`
  mutation ProductAddMutation($input: ProductAddInput!) {
    ProductAddMutation(input: $input) {
      productEdge {
        node {
          id
          title
          description
          active
        }
      }
      error
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
    updater: store => {
      const newEdge = store
        .getRootField('ProductAddMutation')
        .getLinkedRecord('productEdge');
      connectionUpdater({
        store,
        parentId: ROOT_ID,
        connectionName: 'ListProducts_products',
        edge: newEdge,
        before: true,
      });
    },
  });
}

export default { commit };
