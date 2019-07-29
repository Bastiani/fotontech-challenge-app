import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { Button, Form, Text } from 'native-base';
import styled from 'styled-components/native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import idx from 'idx';
import { graphql, createFragmentContainer } from 'react-relay';

import TextField from '../../components/input/TextFieldFormik';

import CommonScene from '../CommonScene';

import createQueryRenderer from '../../relay/createQueryRenderer';

import ProductAddMutation from './mutations/ProductAddMutation';
import ProductEditMutation from './mutations/ProductEditMutation';

const FormStyled = styled(Form)`
  margin: 5px;
  margin-bottom: 10px;
`;

const ProductForm = ({ handleSubmit, navigation }) => {
  return (
    <CommonScene navigation={navigation}>
      <ScrollView>
        <FormStyled>
          <TextField label="Title" name="title" />
          <TextField label="Description" name="description" />
        </FormStyled>
        <Button block success onPress={handleSubmit}>
          <Text>Save</Text>
        </Button>
      </ScrollView>
    </CommonScene>
  );
};

const createProductForm = withFormik({
  mapPropsToValues: ({ query }) => ({
    id: idx(query, _ => _.product.id) || '',
    title: idx(query, _ => _.product.title) || '',
    description: idx(query, _ => _.product.description) || '',
  }),
  validationSchema: yup.object().shape({
    title: yup.string().required('Preencha o campo Title'),
    description: yup.string().required('Preencha o campo Description'),
  }),
  handleSubmit: async (values, { props: { navigation }, setSubmitting }) => {
    const onCompleted = res => {
      setSubmitting(false);
      const response =
        (res && res.ProductAddMutation) || res.ProductEditMutation;
      Alert.alert('Success', 'Operação realizada com sucesso!');

      if (response && response.error) {
        Alert.alert('Erro', 'Falha na operação');
      }
    };

    const onError = () => {
      setSubmitting(false);
      Alert.alert('Erro', 'Falha na operação');
    };

    const { id, ...valuesAdd } = values;

    navigation.getParam('id', 'NO-ID') !== 'NO-ID'
      ? ProductEditMutation.commit(values, onCompleted, onError)
      : ProductAddMutation.commit(valuesAdd, onCompleted, onError);
  },
})(ProductForm);

const ProductFormFragment = createFragmentContainer(createProductForm, {
  query: graphql`
    fragment ProductForm_query on Query
      @argumentDefinitions(id: { type: "ID!" }) {
      product(id: $id) {
        id
        title
        description
      }
    }
  `,
});

export default createQueryRenderer(ProductFormFragment, {
  query: graphql`
    query ProductFormQuery($id: ID!) {
      ...ProductForm_query @arguments(id: $id)
    }
  `,
  queriesParams: ({ navigation }) => ({
    id: navigation.getParam('id', 'NO-ID'),
  }),
});
