import React from 'react';
import { useInterval } from 'Helpers';
import useError from './useError';
import './style.scss';

const ErrorMessage = ({ message, close }) => {
  useInterval(close, 1000);

  return <div className='error-message'>{message}</div>;
};
export default ErrorMessage;
export { useError };
