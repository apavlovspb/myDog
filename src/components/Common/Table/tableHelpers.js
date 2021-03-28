import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useSearch = link => {
  const history = useHistory();
  const dispatch = useDispatch();
  const UserClick = value => async () => {
    await history.push(link);
    dispatch.users.changeSearchParams(value);
  };

  return UserClick;
};
