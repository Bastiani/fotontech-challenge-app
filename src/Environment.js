/* https://facebook.github.io/relay/docs/en/relay-environment.html
   https://facebook.github.io/relay/docs/en/network-layer.html
*/

import { installRelayDevTools } from 'relay-devtools';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GRAPHQL_URL, GRAPHQL_WS_URL } from 'react-native-dotenv';
import fetchWithRetries from 'fbjs/lib/fetchWithRetries';

import { getToken } from './security/authentication';

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text;
  const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_URL, {
    reconnect: true
  });

  const onNext = result => {
    observer.onNext(result);
  };
  const onError = error => {
    observer.onError(error);
  };
  const onComplete = () => {
    observer.onCompleted();
  };

  const client = subscriptionClient
    .request({ query, variables })
    .subscribe(onNext, onError, onComplete);

  // Return a dispose method to be able to unsubscribe and trigger closing the
  // socket connection
  return {
    dispose: () => {
      // unsubscribe and close this socket connection
      client.unsubscribe();
      subscriptionClient.close();
    }
  };
};

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
async function fetchQuery(operation, variables) {
  const token = await getToken();

  const headers = {
    Authorization: token,
    query: operation.name
  };

  const options = {
    fetchTimeout: 30000,
    retryDelays: [1000, 3000, 5000, 10000]
  };

  const response = await fetchWithRetries(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    }),
    ...options
  });

  return response.json();

  // eslint-disable-next-line
  // return fetch(GRAPHQL_URL, {
  //   method: 'POST',
  //   headers: {
  //     // Add authentication and other headers here
  //     'content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: operation.text, // GraphQL text from input
  //     variables,
  //   }),
  // }).then(response => response.json());
}

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchQuery, setupSubscription);
const handlerProvider = null;

installRelayDevTools();

const environment = new Environment({
  handlerProvider, // Can omit.
  network,
  store
});

export default environment;
