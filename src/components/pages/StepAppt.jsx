/* eslint-disable */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
/*import AppBar from "material-ui/AppBar";*/
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "@material-ui/core/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Card from "material-ui/Card";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import ApptService from "../../actions/auth";
import { loadUser } from "../../actions/auth";
import store from "../../store";

class StepAppt extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clinics: [],
      availableSlots: [],
      appointmentDate: {},
      schedule: [],
      confirmationModalOpen: false,
      smallScreen: window.innerWidth < 768,
      stepIndex: 0,
      value: -1,
      selectedOption: -1,
      failureMessage: "",
    };
  }
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

  handleClose = () => {
    this.setState({
      confirmationModalOpen: false,
    });
  };

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

              <Step>
                <StepLabel>
                  Choose an desired date for your appointment
                </StepLabel>
                <StepContent>
                  {DatePickerExampleSimple()}
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
                <StepContent>
                  <p>
                    Clinic Selected:{" "}
                    <strong>{this.getClinicName(this.state.value)}</strong>
                  </p>
                  <p>
                    Date Selected:
                    <strong>
                      {" "}
                      {moment(this.state.appointmentDate).format(
                        "DD-MM-YYYY"
                      )}{" "}
                    </strong>
                  </p>
                  <p>
                    Time Slot Selected:{" "}
                    <strong>
                      {this.getTimeSlot(this.state.selectedOption)}
                    </strong>
                  </p>

                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            onClose={this.handleClose}
            modal={true}
            open={confirmationModalOpen}
            title="Your Appointment is not Booked"
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
