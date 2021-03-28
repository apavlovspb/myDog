import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormItem from 'Components/Common/FormItem';
import FormButton from 'Components/Common/FormButton';
import { useInterval } from 'Helpers';
import './style.scss';

const SearchPanel = React.memo(({ label, customClass, children, left, right, refresh, func }) => {
  const { searchParams } = useSelector(({ users }) => users);
  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [anim, setAnim] = React.useState(false);
  const handleChange = cb => event => cb(event.target.value);
  const submit = async e => {
    e.preventDefault();
    if (data === searchParams) {
      return;
    }
    setAnim(false);
    await dispatch.users.changeSearchParams(data);
    func();
  };
  const reset = async () => {
    setAnim(true);
    //   setData('');
    //  await dispatch.users.changeSearchParams('');
    refresh();

    //  setAnim(false);
  };
  useInterval(() => setAnim(false), 2000);
  React.useEffect(() => {
    setData(searchParams);
    return () => {
      // dispatch.users.changeSearchParams('');
    };
  }, [dispatch.users, searchParams]);

  return (
    <div className={`search-panel ${customClass}`}>
      {left && (
        <div className='search-panel-content'>
          <form className='search-panel-form' onSubmit={submit}>
            <FormItem
              additionalClass='search-panel-form-item'
              color='white'
              label={label}
              value={data}
              onChange={handleChange(setData)}
            />
            <FormButton type='submit' color='black'>
              <i className='fas fa-search' />
            </FormButton>
          </form>
        </div>
      )}
      {right && (
        <div className='search-panel-children'>
          {children}
          <FormButton type='button' color='white' onClick={reset}>
            <i className={`fas fa-sync-alt ${anim ? 'anim' : ''}`} />
          </FormButton>
        </div>
      )}
    </div>
  );
});
export default SearchPanel;
