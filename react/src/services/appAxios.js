import axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://localhost:5000/api/v1'

// https://github.com/axios/axios#creating-an-instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000, // 5000ms = 5s
})

const appointmentAPI = {
    login: (email, password) => {
        return axiosInstance.post('/users/login', qs.stringify({
            email: email,
            password: password,
        }))
    },
    getClinic: () => {
        return axiosInstance.get('/products')
    },
    getAppointment: (slug) => {
        return axiosInstance.get(`/products/${slug}`)
    }
}

export default appointmentAPI
