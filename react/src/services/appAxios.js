import axios from "axios";
//import qs from "qs";
import moment from "moment";

const baseUrl = "http://localhost:5000/api/v1";

// https://github.com/axios/axios#creating-an-instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000, // 5000ms = 5s
});

const appointmentAPI = {
  /*login: (email, password) => {
        return axiosInstance.post('/users/login', qs.stringify({
            email: email,
            password: password,
        }))
    },*/
  listClinics: () => {
    return axiosInstance.get("/clinics");
  },
  getSlots: (appointmentDate, clinicID) => {
    return axiosInstance.get(
      `/slots?appointmentDate=${moment(appointmentDate).format(
        "YYYY-MM-DD"
      )}&clinicID=${clinicID}`
    );
  } /*
    getAppointment: (slug) => {
        return axiosInstance.get(`/myappintment`)
    }*/,
};

export default appointmentAPI;
