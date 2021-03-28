import React, { useCallback, useState, useRef } from 'react';
// import { useChangeReadOnly } from 'Helpers';
import './style.scss';
// import { ReactComponent as Eye } from 'Theme/assets/images/icons/ic_eye.svg';

const FormItemNo = React.memo(({ label, onChange, value, additionalClass = '', noAutocomplete, ...props }) => {
  const [customClass, setCustomClass] = React.useState(additionalClass);
  const [type] = useState(props.type || 'text');
  const input = useRef(null);
  // const { status, checker } = useChangeReadOnly();
  const highlight = () => {
    setCustomClass(prev => `${prev} error`);
  };

  const handleChange = useCallback(
    e => {
      setCustomClass(prev => prev.replace('error', ''));
      onChange(e);
    },
    [onChange],
  );

  const handleClick = useCallback(() => {
    input.current.focus();
  }, []);

  return (
    <div className='form-item-group'>
      <div
        className={`divHacher form-item ${customClass} ${value.toString().length > 0 ? 'not-empty' : ''}`}
        onKeyPress={handleClick}
        onClick={handleClick}
        tabIndex={0}
        role='button'>
        {value}
      </div>
      <input
        ref={input}
        {...props}
        name={`real-${props.name}`}
        type={type}
        className={`form-item ${customClass} ${value.toString().length > 0 ? 'not-empty' : ''}`}
        value=''
        onChange={handleChange}
        onInvalid={highlight}
        placeholder={label}
        autoComplete='off'
      />
      <input className='autocomplete_hack' name={`faketest-${props.name}`} type={type} />
    </div>
  );
});

export default FormItemNo;
