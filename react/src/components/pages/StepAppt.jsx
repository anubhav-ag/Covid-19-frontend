/* eslint-disable */
<<<<<<< HEAD

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
=======
import React, { Component, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
/*import AppBar from "material-ui/AppBar";*/
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "@material-ui/core/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Card from "material-ui/Card";
<<<<<<< HEAD
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import ApptService from "../../actions/auth";

=======
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper"; 
import { RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";
import appointmentAPI from '../../services/appAxios';
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
class StepAppt extends Component {
  constructor(props, context) {

    super(props, context);

    this.state = {
<<<<<<< HEAD
      clinics: [],
      availableSlots: [],
      appointmentDate: {},
=======
      clinicList: [],
      selectClinic: "",
      first_name: "",
      last_name: "", 
      email: "",
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
      schedule: [],
      confirmationModalOpen: false,
      smallScreen: window.innerWidth < 768,
      stepIndex: 0,
      value: -1,
      selectedOption: -1,
      failureMessage: "",
    };
  }
<<<<<<< HEAD
  componentDidMount() {
    this.listClinics();
  }

  listClinics() {
    ApptService.listClinics().then((response) => {
      this.setState({
        clinics: response.data.clinics,
      });
    });
  }

  createAppointment(clinicID, appointmentDate, timeslot) {
    ApptService.createAppointment(clinicID, appointmentDate, timeslot)
      .then((createApptResponse) => {
        console.log(createApptResponse);
        if (createApptResponse.status == 200) {
          //redirect to dashboard
          this.props.history.push("/api/v1/users/dashboard");
          this.setState({
            confirmationModalOpen: false,
          });
        }
      })
      .catch((err) => {
=======
  
  componentWillMount() {
    axios.get().then(response => {
      console.log("response via db: ", response.data);
      this.handleDBReponse(response.data);
    });
  }

  getClinic() {
    axios.get(appointmentAPI.getClinic).then((response)=> {
      return response.json();
    })
    .then(data=> {
      let clinicList = data.map(clinicList=> {
        return {value: clinicList, display: selectClinic}
      });
      this.setState({
        selectClinic: [{value: "", display: '(Select your Vaccination Clinic)'}].concat(clinicList)
      });
    }).catch(error => {
      console.log(error)
    });
  }

  handleSetAppointmentDate(date) {
    this.setState({ appointmentDate: date, confirmationTextVisible: true });
  }

  // handleSetAppointmentSlot(slot) {
  //   this.setState({ appointmentSlot: slot });
  // }
  // handleSetAppointmentMeridiem(meridiem) {
  //   this.setState({ appointmentMeridiem: meridiem });
  // }
  handleSubmit() {
    this.setState({ confirmationModalOpen: false });
    const newAppointment = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      clinic: this.state.clinic,
      slot_date: moment(this.state.appointmentDate).format("YYYY-DD-MM"),
      slot_time: this.state.appointmentSlot
    };
    axios
      .post(API_BASE + "api/appointmentCreate", newAppointment)
      // eslint-disable-next-line no-unused-vars
      .then(response =>
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
        this.setState({
          confirmationModalOpen: true,
          failureMessage:
            "Could not book Appointment due to error. Please try again.",
        });
        console.log(err);
      });
  }

  handleClinicChange = (event, index, value) => {
    this.setState({
      value,
      appointmentDate: {},
      selectedOption: -1,
      availableSlots: [],
    });
    this.handleNext();
  };

  getClinicName(clinic_id) {
    const findClinic = this.state.clinics.find((item) => {
      return item.id === clinic_id;
    });
    if (findClinic) {
      return findClinic.clinic_name;
    } else return null;
  }

  getTimeSlot(slot_id) {
    const findSlot = this.state.availableSlots.find((item) => {
      return item.id === slot_id;
    });
    if (findSlot) {
      return findSlot.time_slot;
    } else return null;
  }

  getSlots() {
    ApptService.getSlots(this.state.appointmentDate, this.state.value).then(
      (response) => {
        this.setState({ availableSlots: response.data.availableSlots });
      }
    );
  }

  async handleSetAppointmentDate(n, date) {
    await this.setState({
      appointmentDate: date,
      confirmationTextVisible: true,
    });
    await this.getSlots();
  }

  onValueChange(event) {
    this.setState({ selectedOption: parseInt(event.target.value) });
  }

  //Logic for Steps counts to handle the next Steps.
  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({
        stepIndex: stepIndex + 1,
      });
    } else
      this.createAppointment(
        this.state.value,
        moment(this.state.appointmentDate).format("YYYY-MM-DD"),
        this.state.selectedOption
      );
  };

  //Logic for Steps counts to go back to the previous Steps.
  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

<<<<<<< HEAD
  handleClose = () => {
    this.setState({
      confirmationModalOpen: false,
    });
  };

=======
  
  /*
  validateEmail(email) {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email)
      ? this.setState({ email: email, validEmail: true })
      : this.setState({ validEmail: false });
  }
  validatePhone(phoneNumber) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(phoneNumber)
      ? this.setState({ phone: phoneNumber, validPhone: true })
      : this.setState({ validPhone: false });
  }
  */
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
  checkDisableDate(day) {
    const dateString = moment(day).format("YYYY-DD-MM");
    return (
      this.state.schedule[dateString] === true ||
      moment(day).startOf("day").diff(moment().startOf("day")) < 0
    );
  }

  renderAppointmentFailure() {
    // const spanStyle = { color: "#00C854" };
    return <p>Could not book Appointment due to error. Please try again.</p>;
  }

  renderAppointmentConfirmation() {
    const spanStyle = { color: "#00C854" };
    return (
      <section>
        <p>Your Appointment has been booked at:</p>
        <p>
          Clinic name:{" "}
          <span style={spanStyle}>{this.getClinicName(this.state.value)}</span>
        </p>
        <p>
          Date:{" "}
          <span style={spanStyle}>
            {moment(this.state.appointmentDate).format("DD-MM-YYYY")}
          </span>
        </p>
        <p>
          Time:{" "}
          <span style={spanStyle}>
            {this.getTimeSlot(this.state.selectedOption)}
          </span>
        </p>
      </section>
    );
  }
<<<<<<< HEAD

  renderAppointments() {
    return this.state.availableSlots.length > 0
      ? this.state.availableSlots.map((item) => {
          return (
            <RadioButton
              label={item.time_slot}
              key={item.id}
              value={item.id}
              style={{
                marginBottom: 15,
              }}
            />
          );
        })
      : null;
  }
=======
  // renderAppointmentTimes() {
  //   if (!this.state.isLoading) {
  //     const slots = [...Array(8).keys()];
  //     return slots.map(slot => {
  //       const appointmentDateString = moment(this.state.appointmentDate).format(
  //         "YYYY-DD-MM"
  //       );
  //       const time1 = moment()
  //         .hour(9)
  //         .minute(0)
  //         .add(slot, "hours");
  //       const time2 = moment()
  //         .hour(9)
  //         .minute(0)
  //         .add(slot + 1, "hours");
  //       const scheduleDisabled = this.state.schedule[appointmentDateString]
  //         ? this.state.schedule[
  //             moment(this.state.appointmentDate).format("YYYY-DD-MM")
  //           ][slot]
  //         : false;
  //       const meridiemDisabled = this.state.appointmentMeridiem
  //         ? time1.format("a") === "am"
  //         : time1.format("a") === "pm";
  //       return (
  //         <RadioButton
  //           label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
  //           key={slot}
  //           value={slot}
  //           style={{
  //             marginBottom: 15,
  //             display: meridiemDisabled ? "none" : "inherit"
  //           }}
  //           disabled={scheduleDisabled || meridiemDisabled}
  //         />
  //       );
  //     });
  //   } else {
  //     return null;
  //   }
  // }
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1

  //Logic for Steps taken to proceed from 1 action to another.
  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: "12px 0" }}>
        <RaisedButton
          label={stepIndex === 2 ? "Book Appointment" : "Next"}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          backgroundColor="#00C853 !important"
          style={{ marginRight: 12, backgroundColor: "#00C853" }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  isEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  render() {
<<<<<<< HEAD
    const { smallScreen, stepIndex, confirmationModalOpen } = this.state;

    const { value } = this.state;

    const DatePickerExampleSimple = () => {
      let datePickerInputProps = {};

      if (!this.isEmpty(this.state.appointmentDate)) {
        datePickerInputProps.value = this.state.appointmentDate;
      }
      return (
        <div>
          <DatePicker
            {...datePickerInputProps}
            hintText="Select Date"
            mode={smallScreen ? "portrait" : "landscape"}
            onChange={(n, date) => this.handleSetAppointmentDate(n, date)}
            shouldDisableDate={(day) => this.checkDisableDate(day)}
          />
        </div>
      );
    };
    // const modalActions = [];
=======
    const {
      clinicList,
      /*finished,*/
      isLoading,
      smallScreen,
      stepIndex,
      confirmationModalOpen,
      confirmationSnackbarOpen,
      ...data
    } = this.state;
    const contactFormFilled =
      data.firstName &&
      data.lastName &&
      data.phone &&
      data.email &&
      data.validPhone &&
      data.validEmail;
    const DatePickerExampleSimple = () => (
      <div>
        <DatePicker
          hintText="Select Date"
          mode={smallScreen ? "portrait" : "landscape"}
          onChange={(n, date) => this.handleSetAppointmentDate(date)}
          shouldDisableDate={day => this.checkDisableDate(day)}
        />
      </div>
    );
    // const modalActions = [
    //   <FlatButton
    //     label="Cancel"
    //     primary={false}
    //     onClick={() => this.setState({ confirmationModalOpen: false })}
    //   />,
    //   <FlatButton
    //     label="Confirm"
    //     style={{ backgroundColor: "#00C853 !important" }}
    //     primary={true}
    //     onClick={() => this.handleSubmit()}
    //   />
    // ];
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
    return (
      <div>
        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0,
          }}
        >
          <Card
            style={{
              padding: "12px 12px 25px 12px",
              height: smallScreen ? "100vh" : null,
            }}
          >
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              linear={false}
            >
              <Step>
<<<<<<< HEAD
                <StepLabel>Start Booking your Vaccination</StepLabel>

                <StepContent>
                  <SelectField
                    LabelText="Vaccination Centres"
                    placeholder="Please select clinic"
                    value={value}
                    onChange={this.handleClinicChange}
                  >
                    <MenuItem
                      key={-1}
                      primaryText="Plese select clinic"
                      value={-1}
                      disabled
                    />
                    {this.state.clinics.length > 0
                      ? this.state.clinics.map((item) => {
                          return (
                            <MenuItem
                              key={item.id}
                              primaryText={item.clinic_name}
                              value={item.id}
                              placeholder="Please select clinic"
                            />
                          );
                        })
                      : ""}
                  </SelectField>
                </StepContent>
              </Step>
=======
                <StepLabel>
                  Start Booking your Vaccination
                </StepLabel>
                <StepContent>

                    <SelectField LabelText="Vaccination Centres"
                    value={this.state.selectClinic}
                    onChange={e =>
                      this.setState({
                        selectClinic: e.target.value,
                        validationError:
                          e.target.value === ""
                            ? "You must select your Vaccination Centres"
                            : ""
                      })
                    }
                    >
                      {this.state.clinicList.map(clinicList => (
                        <MenuItem
                        primaryText={clinicList.value}
                        key={clinicList.value}
                        value={clinicList.value} 
                        >
                        {clinicList.display}
                        </MenuItem>
                      ))}
                    </SelectField>
                    {this.renderStepActions()}

                </StepContent>  
                  <Step disabled={!data.appointmentDate}>
                </Step>
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1

              <Step>
                <StepLabel>
                  Choose an desired date for your appointment
                </StepLabel>
                <StepContent>
                  {DatePickerExampleSimple()}
<<<<<<< HEAD
                  {this.state.availableSlots.length > 0 ? (
                    <RadioButtonGroup
                      defaultSelected={this.state.selectedOption}
                      style={{
                        marginTop: 15,
                        marginLeft: 15,
                      }}
                      name="appointmentTimes"
                      onChange={(event, value) =>
                        this.onValueChange(event, value)
                      }
                    >
                      {this.renderAppointments()}
                    </RadioButtonGroup>
                  ) : !this.isEmpty(this.state.appointmentDate) ? (
                    "No available Slot, pls select another date"
                  ) : null}
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Please confirm appointment Details</StepLabel>
=======
                  {this.renderStepActions(0)}
                   
                    <SelectField
                    floatingLabelText="Select Time and Date"
                    value={data.appointmentMeridiem}
                    onChange={(evt, key, payload) =>
                      this.handleSetAppointmentMeridiem(payload)
                    }
                    >
                      <MenuItem value={0} primaryText="Insert Available Clinics Time and Date" />
                      
                    </SelectField>            
                      <RadioButtonGroup
                        style={{
                          marginTop: 15,
                          marginLeft: 15
                        }}
                        name="appointmentTimes"
                        defaultSelected={data.appointmentSlot}
                        onChange={(evt, val) => this.handleSetAppointmentSlot(val)}
                      >
                          {/* {this.renderAppointmentTimes()} */}
                        </RadioButtonGroup>
                        {this.renderStepActions(1)}
                    </StepContent>
                  </Step>
                <Step>
                <StepLabel> 
                  Share your contact information with us and well send you a
                  reminder
                
                </StepLabel>

>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
                <StepContent>
                  <p>Clinic Selected: </p>
                  {this.getClinicName(this.state.value)}
                  <p>
                    Date Selected:{" "}
                    {moment(this.state.appointmentDate).format("DD-MM-YYYY")}{" "}
                  </p>
                  <p>Time Slot Selected: </p>
                  {this.getTimeSlot(this.state.selectedOption)}

                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            onClose={this.handleClose}
            modal={true}
            open={confirmationModalOpen}
<<<<<<< HEAD
            title="Your Appointment is not Booked"
=======
            // actions={modalActions}
            title="Confirm your appointment"
>>>>>>> 93b72ef8338235916e4bb5d7710877501cc4efe1
          >
            {this.renderAppointmentFailure()}
            {/* {this.renderAppointmentConfirmation()} */}
          </Dialog>
        </section>
      </div>
    );
  }
}
export default withRouter(StepAppt);
// export default StepAppt;
