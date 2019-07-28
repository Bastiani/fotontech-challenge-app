import * as React from 'react';
import { QueryRenderer } from 'react-relay';
import styled from 'styled-components';
import { Text } from 'react-native';

import environment from '../Environment';

const ContainerStyled = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function createQueryRenderer(FragmentComponent, config) {
  const { query, queriesParams } = config;

  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      const variables = queriesParams
        ? queriesParams(this.props)
        : config.variables;

      return (
        <QueryRenderer
          environment={environment}
          query={query}
          variables={variables}
          render={({ error, props, retry }) => {
            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            if (error) {
              return <Text>{error.message}</Text>;
            }

            if (config.loadingView) {
              return config.loadingView;
            }

            return (
              <ContainerStyled>
                <Text>Loading...</Text>
              </ContainerStyled>
            );
          }}
        />
      );
    }
  }

  return QueryRendererWrapper;
}
