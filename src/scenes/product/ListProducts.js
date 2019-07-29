import React, { useState } from 'react';
import { Alert } from 'react-native';
import { graphql, createRefetchContainer } from 'react-relay';

import createQueryRenderer from '../../relay/createQueryRenderer';

import FlatListCustom from '../../components/flatlist/FlatListCustom';

import CommonScene from '../CommonScene';

import SearchBar from '../../components/search/SearchBar';

import ProductEditMutation from './mutations/ProductEditMutation';

const TOTAL_REFETCH_ITEMS = 10;

const renderHeader = handleSearch => <SearchBar handleSearch={handleSearch} />;

const ListProducts = ({ navigation, query, relay }) => {
  const [isFetchingTop, setIsFetchingTop] = useState(false);
  const [isFetchingEnd, setIsFetchingEnd] = useState(false);

  const onRefresh = () => {
    if (isFetchingTop) return;

    setIsFetchingTop(true);

    const refetchVariables = fragmentVariables => ({
      ...fragmentVariables,
    });
    relay.refetch(
      refetchVariables,
      null,
      () => {
        setIsFetchingTop(false);
        setIsFetchingEnd(false);
      },
      {
        force: true,
      }
    );
  };

  const onCompleted = res => {
    const response = res && res.ProductEditMutation;
    Alert.alert('Success', 'Operação realizada com sucesso!');

    if (response && response.error) {
      Alert.alert('Erro', 'Falha na operação');
    }
    onRefresh();
  };

  const onError = () => {
    Alert.alert('Erro', 'Falha na operação');
  };

  const swipeOutOptions = node => {
    return [
      {
        onPress: () =>
          Alert.alert(
            'Alert',
            'Are you sure you want to delete?',
            [
              { text: 'No', onPress: () => {}, style: 'cancel' },
              {
                text: 'Yes',
                onPress: () => {
                  const { __typename, ...newNode } = node;
                  ProductEditMutation.commit(
                    { active: false, ...newNode },
                    onCompleted,
                    onError
                  );
                },
              },
            ],
            { cancelable: true }
          ),
        text: 'Delete',
        type: 'delete',
      },
    ];
  };

  const handleSearch = search => {
    const refetchVariables = fragmentVariables => ({
      ...fragmentVariables,
      search,
    });
    relay.refetch(refetchVariables, null, () => {}, {
      force: true,
    });
  };

  const onEndReached = () => {
    if (isFetchingEnd) return;

    const { products } = query;

    if (!products.pageInfo.hasNextPage) return;

    setIsFetchingEnd(true);

    const { endCursor } = products.pageInfo;

    const total = products.edges.length + TOTAL_REFETCH_ITEMS;
    const refetchVariables = fragmentVariables => ({
      ...fragmentVariables,
      count: TOTAL_REFETCH_ITEMS,
      cursor: endCursor,
    });
    const renderVariables = {
      count: total,
    };

    relay.refetch(
      refetchVariables,
      renderVariables,
      () => {
        setIsFetchingTop(false);
        setIsFetchingEnd(false);
      },
      {
        force: false,
      }
    );
  };

  return (
    <CommonScene navigation={navigation}>
      {query.products && query.products.edges && (
        <FlatListCustom
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={isFetchingTop}
          data={query.products.edges}
          onItemClick={({ id }) => {
            navigation.navigate('EditProduct', { id });
          }}
          ListHeaderComponent={() => renderHeader(handleSearch)}
          swipeOutOptions={swipeOutOptions}
        />
      )}
    </CommonScene>
  );
};

const ListProductsRefetchContainer = createRefetchContainer(
  ListProducts,
  {
    query: graphql`
      fragment ListProducts_query on Query
        @argumentDefinitions(
          search: { type: "String!" }
          first: { type: Int }
        ) {
        products(first: $first, search: $search)
          @connection(key: "ListProducts_products", filters: []) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              description
            }
          }
        }
      }
    `,
  },
  graphql`
    query ListProductsRefetchQuery($first: Int, $search: String) {
      ...ListProducts_query @arguments(first: $first, search: $search)
    }
  `
);

export default createQueryRenderer(ListProductsRefetchContainer, {
  query: graphql`
    query ListProductsQuery($first: Int, $search: String) {
      ...ListProducts_query @arguments(first: $first, search: $search)
    }
  `,
  variables: {
    first: 10,
    search: '',
  },
});
