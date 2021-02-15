import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import StepAppt from "../pages/StepAppt";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/api/v1/users/register" component={Register} />
        <Route exact path="/api/v1/users/login" component={Login} />
        <Route
          exact
          path="/profiles/api/v1/users/profile"
          component={Profiles}
        />
        <Route exact path="/api/v1/users/profile/:id" component={Profile} />
        <PrivateRoute
          exact
          path="/api/v1/users/dashboard"
          component={Dashboard}
        />
        <PrivateRoute
          exact
          path="/api/v1/createappointment"
          component={StepAppt}
        />
      </Switch>
    </section>
  );
};

export default Routes;
