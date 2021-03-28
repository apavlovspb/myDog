import React from 'react';
import ReactDOM from 'react-dom';
import useModal from './useModal';
import { ReactComponent as Close } from 'Theme/assets/images/icons/close.svg';
import './style.scss';

const ClickOutHandler = require('react-onclickout');

const Popup = ({ hide, customClass = '', children }) => {
  const parent = document.getElementById('root');
  const handleClickOut = React.useCallback(
    e => {
      e.stopPropagation();
      hide();
    },
    [hide],
  );
  return ReactDOM.createPortal(
    <div className='popup-overlay'>
      <ClickOutHandler onClickOut={handleClickOut}>
        <div className={`popup-wrapper ${customClass}`}>
          <button
            className='close-button'
            type='button'
            onClick={() => {
              hide();
            }}>
            <Close />
          </button>
          {children}
        </div>
      </ClickOutHandler>
    </div>,
    parent,
  );
};

export default Popup;
export { useModal };
