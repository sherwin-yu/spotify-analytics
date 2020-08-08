import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (token) {
        return <Component {...rest} {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/connect',
            state: {
              from: props.location
            }
          }}
        />
      );
    }}
  />
);

export default ProtectedRoute;
