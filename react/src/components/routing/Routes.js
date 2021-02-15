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
        <Route exact path="/users/register" component={Register} />
        <Route exact path="/users/login" component={Login} />
        <Route exact path="/users/profile" component={Profiles} />
        <Route exact path="/users/profile/:id" component={Profile} />
        <PrivateRoute exact path="/users/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/createappointment" component={StepAppt} />
      </Switch>
    </section>
  );
};

export default Routes;
