import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/../pages/Register';
import Login from '../pages/Login';
import Alert from '../layout/Alert';
import Dashboard from '../pages/dashboard/Dashboard';
// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/Profile';
import NotFound from '../layout/Notfound';
import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} /> */}
        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
