import React, { Component } from "react";
/*import AppBar from "material-ui/AppBar";*/
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";
import ApptService from "../../services/appAxios";
//import slot from "../../../../../Covid19/models/slot";

class StepAppt extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clinics: [],
      availableSlots: {},
      appointmentDate: {},
      firstName: "",
      lastName: "",
      email: "",
      schedule: [],
      confirmationModalOpen: false,
      appointmentDateSelected: false,
      appointmentMeridiem: 0,
      validEmail: true,
      validPhone: true,
      finished: false,
      smallScreen: window.innerWidth < 768,
      stepIndex: 0,
      value: -1,
      slotErr: "",
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
  handleClinicChange = (event, index, value) => {
    this.setState({ value });
    this.handleNext();
  };

  getSlots() {
    ApptService.getSlots(this.state.appointmentDate, this.state.value).then(
      (response) => {
        this.setState({ availableSlots: response.data.availableSlots });
        console.log(typeof this.state.availableSlots);
        console.log(this.state.availableSlots);
      }
    );
  }

  async handleSetAppointmentDate(n, date) {
    await this.setState({
      appointmentDate: date,
      confirmationTextVisible: true,
    });
    await this.getSlots();
    console.log("checking at line75 handlesetapptdate");
    console.log(this.renderAppointments());
  }

  handleSetAppointmentSlot(slot) {
    this.setState({ appointmentSlot: slot });
  }
  handleSetAppointmentMeridiem(meridiem) {
    this.setState({ appointmentMeridiem: meridiem });
  }
  handleSubmit() {
    this.setState({ confirmationModalOpen: false });
    const newAppointment = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      clinic: this.state.clinic,
      slot_date: moment(this.state.appointmentDate).format("YYYY-DD-MM"),
      slot_time: this.state.appointmentSlot,
    };
    axios
      .post(ApptService + "api/appointmentCreate", newAppointment)
      // eslint-disable-next-line no-unused-vars
      .then((response) =>
        this.setState({
          confirmationSnackbarMessage: "Appointment succesfully added!",
          confirmationSnackbarOpen: true,
          processed: true,
        })
      )
      .catch((err) => {
        console.log(err);
        return this.setState({
          confirmationSnackbarMessage: "Appointment failed to save.",
          confirmationSnackbarOpen: true,
        });
      });
  }
  //Logic for Steps counts to handle the next Steps.
  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };
  //Logic for Steps counts to go back to the previous Steps.
  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  checkDisableDate(day) {
    const dateString = moment(day).format("YYYY-DD-MM");
    return (
      this.state.schedule[dateString] === true ||
      moment(day).startOf("day").diff(moment().startOf("day")) < 0
    );
  }

  renderAppointmentConfirmation() {
    const spanStyle = { color: "#00C853" };
    return (
      <section>
        <p>
          Name:{" "}
          <span style={spanStyle}>
            {this.state.firstName} {this.state.lastName}
          </span>
        </p>
        <p>
          Number: <span style={spanStyle}>{this.state.phone}</span>
        </p>
        <p>
          Email: <span style={spanStyle}>{this.state.email}</span>
        </p>
        <p>
          Appointment:{" "}
          <span style={spanStyle}>
            {moment(this.state.appointmentDate).format(
              "dddd[,] MMMM Do[,] YYYY"
            )}
          </span>{" "}
          at{" "}
          <span style={spanStyle}>
            {moment()
              .hour(9)
              .minute(0)
              .add(this.state.appointmentSlot, "hours")
              .format("h:mm a")}
          </span>
        </p>
      </section>
    );
  }

  renderAppointments() {
    {
      this.state.availableSlots.length > 0
        ? this.state.availableSlots.map((item) => {
            console.log("line 177");
            console.log(item);
            return (
              <RadioButton
                label={item.id}
                key={item.id}
                value={item.id}
                style={{
                  marginBottom: 15,
                }}
              />
            );
          })
        : "No Slot Available";
    }
  }

  renderAppointmentTimes() {
    if (!this.state.isLoading) {
      const slots = [...Array(8).keys()];
      return slots.map((slot) => {
        const appointmentDateString = moment(this.state.appointmentDate).format(
          "YYYY-DD-MM"
        );
        const time1 = moment().hour(9).minute(0).add(slot, "hours");
        const time2 = moment()
          .hour(9)
          .minute(0)
          .add(slot + 1, "hours");
        const scheduleDisabled = this.state.schedule[appointmentDateString]
          ? this.state.schedule[
              moment(this.state.appointmentDate).format("YYYY-DD-MM")
            ][slot]
          : false;
        const meridiemDisabled = this.state.appointmentMeridiem
          ? time1.format("a") === "am"
          : time1.format("a") === "pm";
        return (
          <RadioButton
            label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
            key={slot}
            value={slot}
            style={{
              marginBottom: 15,
              display: meridiemDisabled ? "none" : "inherit",
            }}
            disabled={scheduleDisabled || meridiemDisabled}
          />
        );
      });
    } else {
      return null;
    }
  }

  //Logic for Steps taken to proceed from 1 action to another.
  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: "12px 0" }}>
        <RaisedButton
          label={stepIndex === 2 ? "Finish" : "Next"}
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

  render() {
    const {
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
    const { value } = this.state;
    const DatePickerExampleSimple = () => (
      <div>
        <DatePicker
          hintText="Select Date"
          mode={smallScreen ? "portrait" : "landscape"}
          onChange={(n, date) => this.handleSetAppointmentDate(n, date)}
          shouldDisableDate={(day) => this.checkDisableDate(day)}
        />
      </div>
    );
    const modalActions = [];
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
                  {this.renderAppointments()}
                  <RadioButtonGroup
                    style={{
                      marginTop: 15,
                      marginLeft: 15,
                    }}
                    name="appointmentTimes"
                    defaultSelected={data.appointmentSlot}
                    onChange={() => this.renderAppointments()}
                  ></RadioButtonGroup>
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  Share your contact information with us and well send you a
                  reminder
                </StepLabel>

                <StepContent>
                  <p>
                    <section>
                      <TextField
                        style={{ display: "block" }}
                        name="first_name"
                        hintText="First Name"
                        floatingLabelText="First Name"
                        onChange={(evt, newValue) =>
                          this.setState({ firstName: newValue })
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="last_name"
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        onChange={(evt, newValue) =>
                          this.setState({ lastName: newValue })
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="email"
                        hintText="youraddress@mail.com"
                        floatingLabelText="Email"
                        errorText={
                          data.validEmail ? null : "Enter a valid email address"
                        }
                        onChange={(evt, newValue) =>
                          this.validateEmail(newValue)
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="phone"
                        hintText="+2348995989"
                        floatingLabelText="Phone"
                        errorText={
                          data.validPhone ? null : "Enter a valid phone number"
                        }
                        onChange={(evt, newValue) =>
                          this.validatePhone(newValue)
                        }
                      />
                      <RaisedButton
                        style={{ display: "block", backgroundColor: "#00C853" }}
                        label={
                          contactFormFilled
                            ? "Schedule"
                            : "Fill out your information to schedule"
                        }
                        labelPosition="before"
                        primary={true}
                        fullWidth={true}
                        onClick={() =>
                          this.setState({
                            confirmationModalOpen: !this.state
                              .confirmationModalOpen,
                          })
                        }
                        disabled={!contactFormFilled || data.processed}
                        /*style={{ marginTop: 20, maxWidth: 100 }}*/
                      />
                    </section>
                  </p>
                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            modal={true}
            open={confirmationModalOpen}
            actions={modalActions}
            title="Confirm your appointment"
          >
            {this.renderAppointmentConfirmation()}
          </Dialog>
          <SnackBar
            open={confirmationSnackbarOpen || isLoading}
            message={
              isLoading ? "Loading... " : data.confirmationSnackbarMessage || ""
            }
            autoHideDuration={10000}
            onRequestClose={() =>
              this.setState({ confirmationSnackbarOpen: false })
            }
          />
        </section>
      </div>
    );
  }
}
export default StepAppt;
