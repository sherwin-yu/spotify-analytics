import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomeContainer from './components/Home/HomeContainer';
import Login from './components/Login/Login';

const token = Cookies.get('spotify_access_token');

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" token={token} component={HomeContainer} />
        <Route exact path="/connect" component={Login} />
        <Route
          path="*"
          component={() => (
            <h1 style={{ textAlign: 'center', padding: '1em' }}>
              404: Page Not Found
              <span role="img" aria-label="confounded-face" style={{ marginLeft: '5px' }}>
                😖
              </span>
            </h1>
          )}
        />
      </Switch>
    </BrowserRouter>
  </div>
);

export default hot(module)(App);
