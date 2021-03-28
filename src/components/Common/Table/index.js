import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const transformItem = (cell, transform) => {
  return transform && transform(cell);
};

const Rows = React.memo(({ headers, row, buttons, attention, cell, transform, disabledBtn, keyForBtn }) => {
  return (
    <div className={`table-body-row ${row[attention] ? 'attention' : ''}`}>
      {headers.map(item => {
        if (cell && cell.findIndex(elem => elem === item) >= 0) {
          return (
            <div className={`table-row-item ${item}-row`} key={item}>
              {transformItem(row[item], transform[item])}
            </div>
          );
        }
        return (
          <div className={`table-row-item ${item}-row`} key={item}>
            {row[item]?.toString() || 'none'}
          </div>
        );
      })}
      {buttons && (
        <div className='table-row-buttons'>
          {disabledBtn ? (
            <>
              {buttons.map(item => (
                <button className='table-row-buttons-item disabled' disabled key={item.icon} type='button'>
                  <i className={item.icon} />
                </button>
              ))}
            </>
          ) : (
            <>
              {buttons.map(item => (
                <button
                  className='table-row-buttons-item'
                  key={item.icon}
                  type='button'
                  onClick={item.cb(row[headers[keyForBtn]])}>
                  <i className={item.icon} />
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
});

const Table = ({
  tableName,
  headers,
  rows,
  buttons,
  attention,
  cell,
  transform,
  keyForDisabledButton,
  valueForDisabledButton,
  keyForRow,
  elementIdForButton,
  headerTextTransform = it => it,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`table ${tableName}`}>
      <div className={`table-headers ${tableName}-header`}>
        {headers.map(item => (
          <div key={item} className={`table-headers-item ${item}-header`}>
            {t(headerTextTransform(item))}
          </div>
        ))}
        {buttons ? <div className={`table-headers-buttons ${tableName}-header-buttons`} /> : null}
      </div>
      <div className={`table-body ${tableName}-body`}>
        {rows.map(item => (
          <Rows
            key={keyForRow ? item[headers[keyForRow]] : item[headers[0]]}
            keyForBtn={elementIdForButton || 0}
            headers={headers}
            row={item}
            buttons={buttons}
            attention={attention}
            cell={cell}
            transform={transform}
            disabledBtn={
              valueForDisabledButton && valueForDisabledButton.findIndex(el => el === item[keyForDisabledButton]) > -1
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
