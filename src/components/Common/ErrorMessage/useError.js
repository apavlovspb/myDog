import React from 'react';

const useError = () => {
  const [error, setError] = React.useState('');

  const addError = val => {
    setError(val);
  };
  const removeError = () => {
    setError('');
  };
  return {
    error,
    addError,
    removeError,
  };
};
export default useError;
