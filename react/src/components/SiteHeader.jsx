<<<<<<< HEAD
import React from "react";
// import { Navlink } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
=======
import React from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1

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

const SiteHeader = () => {
  //  const [isOpen, setOpen] = useState(false)

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Covid-19 Booking
          </Typography>
<<<<<<< HEAD

          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
=======
          
          <Button Link to="/Login" color="inherit" >Login</Button>
          <Button Link to="/Register" color="inherit">Register</Button>
          
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SiteHeader;
