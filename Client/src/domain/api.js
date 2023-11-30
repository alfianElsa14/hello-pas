import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  appointment: 'appointments',
  reviews: 'reviews',
  user: 'users',
  doctor: 'doctors',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const testValidateTokenUser = (token) => callAPI(
  `${urls.user}/verify-token`, 'POST', { authorization: `Bearer ${token}` }
);

export const testValidateTokenDoctor = (token) => callAPI(
  `${urls.user}/verify-token`, 'POST', { authorization: `Bearer ${token}` }
);

export const getAllReviews = (id) => callAPI(`${urls.reviews}/getReviews/${id}`, 'get');

export const addReview = (id, data) => callAPI(`${urls.reviews}/addReview/${id}`, 'post', {}, {}, data);

export const deleteReview = (id) => callAPI(`${urls.reviews}/deleteReview/${id}`, 'delete');

export const registerUser = (data) => callAPI(`${urls.user}/register`, 'post', {}, {}, data);

export const loginUser = (data) => callAPI(`${urls.user}/login`, 'post', {}, {}, data);

export const registerDoctor = (data) => callAPI(`${urls.doctor}/register`, 'post', {}, {}, data);

export const loginDoctor = (data) => callAPI(`${urls.doctor}/login`, 'post', {}, {}, data);

export const userById = (id) => callAPI(`${urls.user}/${id}`, 'get');

export const userProfile = () => callAPI(urls.user, 'get')

export const doctorProfile = () => callAPI(urls.doctor, 'get')

export const editUser = (id, data) => callAPI(`${urls.user}/editUser/${id}`, 'put', {}, {}, data);

export const getAppointmentsByUserID = (userId) => callAPI(`${urls.appointment}/user/${userId}`, 'GET');

export const midtransPayment = (id) => callAPI(`${urls.appointment}/midtransToken/${id}`, 'post')

export const appointmentStatus = (id) => callAPI(`${urls.appointment}/pay/${id}`, 'put')

export const getAllDoctors = () => callAPI(`${urls.doctor}/allDoctors`, 'get')

export const getDoctorById = (id) => callAPI(`${urls.doctor}/${id}`, 'get')
