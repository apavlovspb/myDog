import React from 'react';

const useModal = () => {
  const [open, setOpen] = React.useState(false);
  const hide = () => {
    setOpen(false);
  };
  const show = () => {
    setOpen(true);
  };
  return {
    open,
    show,
    hide,
  };
};
export default useModal;
