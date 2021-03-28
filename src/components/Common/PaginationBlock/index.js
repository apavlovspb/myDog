import React from 'react';
import './style.scss';

const PaginationBlock = React.memo(({ cb, totalPages, currentPage }) => {
  let arr = [];
  const testarr = [...new Array(totalPages).keys()];
  if (totalPages > 10) {
    arr = testarr.slice(0, 10);
    if (currentPage > 5) {
      arr = testarr.slice(currentPage - 5, currentPage + 5);
    }
    if (currentPage > totalPages - 5) {
      arr = testarr.slice(totalPages - 10, totalPages);
    }
  } else {
    arr = testarr;
    if (totalPages === 1) {
      arr = [];
    }
  }
  const prev = () => {
    // debugger;
    if (currentPage > 1) {
      cb(currentPage - 1)();
    }
  };
  const next = () => {
    // debugger;
    if (currentPage < totalPages) {
      cb(currentPage + 1)();
    }
  };
  return (
    <div className='pagination-block'>
      <div>
        {currentPage > 1 && (
          <button type='button' onClick={prev} className='pagination-block-item'>
            {'<'}
          </button>
        )}
        {arr.map(item => (
          <button
            type='button'
            key={item}
            className={`pagination-block-item ${item + 1 === currentPage ? 'target' : ''}`}
            onClick={cb(item + 1)}>
            {item + 1}
          </button>
        ))}{' '}
        {currentPage < totalPages && (
          <button type='button' onClick={next} className='pagination-block-item'>
            {'>'}
          </button>
        )}
      </div>
    </div>
  );
});
export default PaginationBlock;
