import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const PageHeader = React.memo(({ title, comment }) => {
  const { t } = useTranslation();
  return (
    <div className='page-header'>
      <div className='page-header-title'>{t(title)}</div>
      <div className='page-header-comment'>{t(comment)}</div>
    </div>
  );
});
export default PageHeader;
