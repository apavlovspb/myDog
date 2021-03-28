import { init } from '@rematch/core';
import { createLogger } from 'redux-logger';
import * as models from './store/models';

const logger = createLogger({
  collapsed: true,
});

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [logger];
} else {
  middleware = [];
}

const store = init({
  models,
  redux: {
    middlewares: middleware,
  },
});

export default store;
