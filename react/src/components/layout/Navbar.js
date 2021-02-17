import React, { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const classes = useStyles();

  //Authenticated User Access 
  const authLinks = (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid-19 Vaccination Booking
          </Typography>
          <p></p>
          {user && !user.apptData ? (
            <Button
              component={RouterLink}
              to="/createappointment"
              color="inherit"
            >
              Book Appointment
            </Button>
          ) : (
            ""
          )}
          <Button
            component={RouterLink}
            to="/"
            onClick={logout}
            color="inherit"
          >
            Logout
          </Button>
          <Button component={RouterLink} to="/users/dashboard" color="inherit">
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );

  //Guest User Access
  const guestLinks = (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"  className={classes.title}>
            Covid-19 Vaccination Booking
          </Typography>
          <Button
            component={RouterLink}
            to="/users/register"
            color="inherit"
          >
            Book Appointment
          </Button>
          <Button component={RouterLink} to="/users/login" color="inherit">
            Login
          </Button>
          <Button component={RouterLink} to="/users/register" color="inherit">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );

  return (
    <AppBar position="static">
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </AppBar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
