import React, { useState } from 'react';
import { Container, Header, Content } from 'native-base';
import { graphql, createRefetchContainer } from 'react-relay';

import createQueryRenderer from '../../relay/createQueryRenderer';

import FlatListCustom from '../../components/flatlist/FlatListCustom';

const TOTAL_REFETCH_ITEMS = 10;

// const handleSearch = text => {
//   const refetchVariables = fragmentVariables => ({
//     ...fragmentVariables,
//     name: text,
//   });
//   const { relay } = this.props;

//   relay.refetch(refetchVariables, null, () => {}, {
//     force: true,
//   });

//   this.setState({ search: text });
// };

// const renderHeader = () => (
//   <SearchBarWithInput
//     onChangeText={text => handleSearch(text)}
//     value={this.state.search}
//     placeholder="Search..."
//     showAction
//     action={() => navigation.navigate('GroupAdd')}
//   />
// );

const ListProducts = ({ query, relay }) => {
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
    <Container>
      <Header />
      <Content>
        {query.products && query.products.edges && (
          <FlatListCustom
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            refreshing={isFetchingTop}
            data={query.products.edges}
            // onItemClick={({ id }) => {
            //   navigation.navigate('GroupDetails', { id });
            // }}
            // ListHeaderComponent={renderHeader}
          />
        )}
      </Content>
    </Container>
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
