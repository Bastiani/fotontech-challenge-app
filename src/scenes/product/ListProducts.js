import React, { useState } from 'react';
import {
  Container,
  Header,
  Content,
  Item,
  Icon,
  Input,
  Button,
  Text,
} from 'native-base';
import { graphql, createRefetchContainer } from 'react-relay';
import styled from 'styled-components/native';

import createQueryRenderer from '../../relay/createQueryRenderer';

import FlatListCustom from '../../components/flatlist/FlatListCustom';

const ContentStyled = styled(Content)`
  background-color: #1d3557;
`;

const HeaderStyled = styled(Header)`
  padding: 5px;
`;

const TOTAL_REFETCH_ITEMS = 10;

const ListProducts = ({ query, relay }) => {
  const [isFetchingTop, setIsFetchingTop] = useState(false);
  const [isFetchingEnd, setIsFetchingEnd] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const refetchVariables = fragmentVariables => ({
      ...fragmentVariables,
      search,
    });
    relay.refetch(refetchVariables, null, () => {}, {
      force: true,
    });

    setSearch(search);
  };

  const renderHeader = () => (
    <HeaderStyled searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input
          key="search"
          name="search"
          onChangeText={setSearch}
          value={search}
          placeholder="Search"
        />
        <Icon name="ios-people" />
      </Item>
      <Button transparent onPress={handleSearch}>
        <Text>Search</Text>
      </Button>
    </HeaderStyled>
  );

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
      <ContentStyled>
        {query.products && query.products.edges && (
          <FlatListCustom
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            refreshing={isFetchingTop}
            data={query.products.edges}
            // onItemClick={({ id }) => {
            //   navigation.navigate('GroupDetails', { id });
            // }}
            ListHeaderComponent={renderHeader}
          />
        )}
      </ContentStyled>
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
