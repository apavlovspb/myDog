import React, { useCallback, useState, useRef } from 'react';
// import { useChangeReadOnly } from 'Helpers';
import './style.scss';
// import { ReactComponent as Eye } from 'Theme/assets/images/icons/ic_eye.svg';

const FormArea = React.memo(
  ({ label, onChange, value, additionalClass = '', noAutocomplete, small, color, ...props }) => {
    const [customClass, setCustomClass] = React.useState(additionalClass);
    const [type] = useState(props.type || 'text');
    const input = useRef(null);
    // const { status, checker } = useChangeReadOnly();
    const highlight = () => {
      setCustomClass(prev => `${prev} error`);
    };

    // const toggleType = () => {
    //   setType(prev => (prev === 'password' ? 'text' : 'password'));
    // };

    const handleChange = useCallback(
      e => {
        setCustomClass(prev => prev.replace('error', ''));
        onChange(e);
      },
      [onChange],
    );
    return (
      <div className={`form-area-group ${color}`}>
        <textarea
          ref={input}
          {...props}
          name={`real-${props.name}`}
          type={type}
          className={`form-area ${customClass} ${value?.toString().length > 0 ? 'not-empty' : ''} ${
            small ? 'small' : ''
          }`}
          value={props.type === 'password' ? undefined : value}
          onChange={handleChange}
          onInvalid={highlight}
          placeholder={label}
        />
        {noAutocomplete && <input className='autocomplete_hack' name={`faketest-${props.name}`} type={type} />}
        {label && <div className='form-area__label'>{label}</div>}
        {/* {props.type === 'password' ? (
        <button
          type='button'
          className={`${type === 'password' ? 'toggle-password' : 'toggle-password crossed'} ${customClass}-button`}
          onClick={toggleType}>
          <Eye />
        </button>
      ) : null} */}
      </div>
    );
  },
);

export default FormArea;
