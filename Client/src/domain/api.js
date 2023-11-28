import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  appointment: 'appointments',
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
export const getAppointmentsByUserID = (userId) => callAPI(`${urls.appointment}/user/${userId}`, 'GET');
// TODO: Add authorization token
export const registerUser = (data) => callAPI(`${urls.user}/register`, 'post', {}, {}, data);
export const loginUser = (data) => callAPI(`${urls.user}/login`, 'post', {}, {}, data);
export const registerDoctor = (data) => callAPI(`${urls.doctor}/register`, 'post', {}, {}, data);
export const loginDoctor = (data) => callAPI(`${urls.doctor}/login`, 'post', {}, {}, data);
