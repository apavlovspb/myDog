/* eslint-disable react/button-has-type */
import React from 'react';
import { useSelector } from 'react-redux';
import { access } from 'Helpers';
import './style.scss';

const FormButton = ({ onClick, type = 'button', customClass = '', children, small, color, checkAccess, ...props }) => {
  const { accesses } = useSelector(({ user }) => user);
  if (checkAccess && access(accesses, checkAccess)) {
    return (
      <button
        {...props}
        type={type}
        disabled
        className={`form-button  ${color} ${customClass} ${small ? 'small' : ''}`}>
        {children}
      </button>
    );
  }
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`form-button ${color} ${customClass} ${small ? 'small' : ''}`}>
      {children}
    </button>
  );
};

export default FormButton;
