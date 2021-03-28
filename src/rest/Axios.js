/* eslint-disable no-console */
import axios from 'axios';
import { MAIN_URL } from 'Rest/config';
import { localStore, helperCookie } from 'Helpers';

const parsePath = path => {
  if (path.indexOf(MAIN_URL) === 0) {
    return `Stage2 | ${path.slice(path.indexOf(MAIN_URL) + MAIN_URL.length)}`;
  }
  return path;
};

const AxiosGet = ({ withCredentials = true, url, params, headers }) => {
  const objReq = {
    method: 'get',
    url,
    withCredentials,
    params,
    headers: { 'Content-Type': 'application/json', ...headers },
  };
  return axios(objReq)
    .then(res => {
      console.log(`%c AXIOS GET ${parsePath(url)}`, 'color: green', res.data);
      return res;
    })
    .catch(err => {
      console.log(`%c AXIOS GET ERROR ${parsePath(url)}`, 'color: red', err.response);
      if (err.response?.data?.code === 74100) {
        localStore.removeItem('userId');
        helperCookie.remove('token');
        if (window.Intercom) {
          window.Intercom('shutdown');
          window.Intercom('boot', {
            app_id: 'gmz5n8uf',
          });
        }
        document.location.reload();
      }
      throw err;
    });
};

const AxiosPost = ({ url, data, withCredentials = true, headers }) => {
  const objReq = {
    method: 'post',
    url,
    data,
    headers: { 'Content-Type': 'application/json', ...headers },
    withCredentials,
  };
  return axios(objReq)
    .then(res => {
      console.log(`%c AXIOS POST ${parsePath(url)}`, 'color: green', res.data);
      return res;
    })
    .catch(err => {
      console.log(`%c AXIOS POST ERROR ${parsePath(url)}`, 'color: red', err.response);
      if (err.response?.data?.code === 74100) {
        localStore.removeItem('userId');
        helperCookie.remove('token');
        // const userInfo = getToken();
        // document.cookie = `userId=${userInfo.userId}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        // document.cookie = `token=${userInfo.wsToken}; path=/; expires=$Thu, 01 Jan 1970 00:00:00 GMT`;
        if (window.Intercom) {
          window.Intercom('shutdown');
          window.Intercom('boot', {
            app_id: 'gmz5n8uf',
          });
        }
        document.location.reload();
      }
      throw err;
    });
};

export { AxiosGet, AxiosPost };
