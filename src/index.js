/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-console */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import './i18n';
import 'normalize.css';
import './theme/assets/styles/_fonts.scss';
import './theme/assets/styles/global.scss';
import AppContainer from './app';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
