import React from 'react';
// import queryString from 'query-string';
import { Route, Switch } from 'react-router-dom';
import { retry } from 'Helpers';

// import Loading from './Loading';
// import ErrorBoundary from './ErrorBoundary';

// import './main/style.scss';

const Main = React.lazy(() => retry(() => import('./components/Main')));

const Loading = () => <div>Loading</div>;

const AppContainer = React.memo(() => {
  return (
    // <ErrorBoundary>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route path='/' component={Main} />
      </Switch>
    </React.Suspense>
    // </ErrorBoundary>
  );
});

export default AppContainer;
