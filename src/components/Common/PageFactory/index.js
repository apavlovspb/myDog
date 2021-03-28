import React from 'react';
import PageHeader from 'Components/Common/PageHeader';
import SearchPanel from 'Components/Common/SearchPanel';
import PaginationBlock from 'Components/Common/PaginationBlock';
import Popup from 'Components/Common/Popup';
import Table from 'Components/Common/Table';

const PageFactory = ({ pageClass, header, search, table, pagination, popup }) => {
  return (
    <div className={pageClass}>
      {header && <PageHeader title={header.title} comment={header.comment} />}
      {search && (
        <SearchPanel
          customClass={`${pageClass}-search`}
          label={search.label}
          refresh={search.refresh}
          left={search.left}
          right={search.right}
          func={search.refresh}>
          {search.buttons}
        </SearchPanel>
      )}
      {table && <Table tableName={`${pageClass}-table`} />}
      {pagination && (
        <PaginationBlock cb={pagination.setPage} totalPages={pagination.pages} currentPage={pagination.currentPage} />
      )}
      {popup.open && popup ? (
        <Popup hide={popup.hide} customClass={`${pageClass}-popup`}>
          {popup.content}
        </Popup>
      ) : null}
    </div>
  );
};
export default PageFactory;
