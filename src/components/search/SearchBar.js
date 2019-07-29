import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';

import useForm from '../useForm';

const SearchBarStyled = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 5px;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;

const InputFilter = styled.View`
  flex: 1;
  flex-direction: row;
  flex-grow: 1;
  background-color: #eeeff1;
  padding: 5px;
  border-radius: 5px;
`;

const Input = styled.TextInput`
  flex: 1;
`;

const SearchBar = ({ handleSearch }) => {
  const { values, handleChange } = useForm();
  return (
    <SearchBarStyled>
      <Container>
        <InputFilter>
          <Input
            key="search"
            name="search"
            value={values.search}
            onChange={event => handleChange(event, 'search')}
            autoCapitalize="none"
          />
        </InputFilter>
        <Button title="Search" onPress={() => handleSearch(values.search)} />
      </Container>
    </SearchBarStyled>
  );
};

export default SearchBar;
