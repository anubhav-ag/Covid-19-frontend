import React, { Fragment, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ApptService from "../../actions/auth";
import { loadUser } from "../../actions/auth";
import store from "../../store";

import PerfectScrollbar from "react-perfect-scrollbar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  actions: {
    justifyContent: "flex-end",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
}));
/*
  createAppointment(clinicID, appointmentDate, timeslot) {
    ApptService.createAppointment(clinicID, appointmentDate, timeslot)
      .then((createApptResponse) => {
        console.log(createApptResponse);
        if (createApptResponse.status == 200) {
          store.dispatch(loadUser());
          //redirect to dashboard
          this.props.history.push("/users/dashboard");
          this.setState({
            confirmationModalOpen: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          confirmationModalOpen: true,
          failureMessage:
            "Could not book Appointment due to error. Please try again.",
        });
        console.log(err);
      });
  }*/

const handleChange = () => {
  ApptService.cancelappt()
    .then((cancelResponse) => {
      console.log("appointment cancelled");
      store.dispatch(loadUser());
      this.props.history.push("/users/dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
};

const Dashboard = ({ getCurrentProfile, auth: { user } }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <DashboardIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Dashboard
          </Typography>
          <Card>
            <CardHeader title="Your Vaccination Schedule" />
            <Divider />
            <PerfectScrollbar>
              <Box minWidth={800}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Vaccination Centre</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Cancel</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {user && user.apptData ? (
                      <TableRow>
                        <TableCell>{user.clinicData.clinic_name}</TableCell>
                        <TableCell>{user.slotData.date}</TableCell>
                        <TableCell>{user.slotData.time_slot}</TableCell>
                        <TableCell>
                          <Chip color="primary" label="Booked" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            onClick={() => handleChange()}
                            color="secondary"
                            label="Cancel"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>Please book your appointment</TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
          </Card>
        </div>
      </Container>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Dashboard);
