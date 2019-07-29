import { useState } from 'react';

const useForm = () => {
  const [values, setValues] = useState({});

  const handleChange = (event, name) => {
    const { text } = event.nativeEvent;
    setValues(values => ({
      ...values,
      [name]: text,
    }));
  };

  return {
    handleChange,
    values,
  };
};

export default useForm;
