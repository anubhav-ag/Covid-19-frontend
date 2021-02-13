import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

const SiteHeader = ({ auth: { isAuthenticated }, logout }) => {
  const classes = useStyles();
  const authLinks = (

  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          Covid-19 Booking 
        </Typography>   
        <Button Link to="/Login" color="inherit" >Login</Button>
        <Button Link to="/Register" color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  </div>
  );

  const guestLinks = (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          Covid-19 Booking 
        </Typography>
        <Button Link to="/Login" color="inherit" >Login</Button>
        <Button Link to="/Register" color="inherit">Register</Button>
        </Toolbar>
    </AppBar>
  </div>
  );

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          Covid-19 Booking 
        </Typography>
        
        <Button Link to="/Login" color="inherit" >Login</Button>
        <Button Link to="/Register" color="inherit">Register</Button>
        </Toolbar>
    </AppBar>
  </div>
  );
};
    

   SiteHeader.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  });

   export default connect(mapStateToProps, { logout })(SiteHeader);