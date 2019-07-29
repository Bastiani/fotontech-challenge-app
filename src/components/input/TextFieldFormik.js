import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import get from 'lodash/get';
import { connect } from 'formik';

const Label = styled.Text`
  color: #f1faee;
  font-size: 12px;
`;

const Input = styled.TextInput`
  color: #f1faee;
  padding: 6px 12px;
  margin-bottom: 10px;
  border-bottom-color: #dce4d9;
  border-bottom-width: 1px;
`;

const Error = styled.Text`
  margin-top: -8px;
  margin-bottom: 10px;
  margin-left: 3px;
  color: #dc3337;
`;

const TextFieldFormik = ({ name, formik, label, ...props }) => {
  const handleChange = event => {
    const { text } = event.nativeEvent;

    formik.setFieldValue(name, text);
  };

  const { values, errors, touched } = formik;
  const value = get(values, name, '');
  const wasTouched = get(touched, name);
  const fieldError = wasTouched && get(errors, name, null);

  return (
    <View>
      {label && <Label>{label}</Label>}
      <Input value={value} onChange={evt => handleChange(evt)} {...props} />
      {fieldError && <Error>{fieldError}</Error>}
    </View>
  );
};

export default connect(TextFieldFormik);
