import api from "../utils/api";
import { setAlert } from "./alert";
import axios from "axios";
import qs from "qs";
import moment from "moment";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_FAIL,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/api/v1/users/dashboard");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/api/v1/users/register", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post("/api/v1/users/login", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

//calls for create Appointment part only
const baseUrl = "http://localhost:5000/api/v1";

// https://github.com/axios/axios#creating-an-instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000, // 5000ms = 5s
});

const appointmentAPI = {
  listClinics: () => {
    return axiosInstance.get("/clinics");
  },
  getSlots: (appointmentDate, clinicID) => {
    return axiosInstance.get(
      `/slots?appointmentDate=${moment(appointmentDate).format(
        "YYYY-MM-DD"
      )}&clinicID=${clinicID}`
    );
  },
  createAppointment: (clinicID, appointmentDate, timeslot) => {
    return axiosInstance.post(
      `/createappointment`,
      qs.stringify({
        clinic_id: clinicID,
        date: appointmentDate,
        time_slot: timeslot,
      })
    );
  },
};

export default appointmentAPI;
