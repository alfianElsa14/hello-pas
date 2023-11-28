import { GET_APPOINTMENTS, SET_APPOINTMENTS } from '@pages/UserAppointment/constants';

export const setAppointments = (appointments) => ({
  type: SET_APPOINTMENTS,
  appointments,
});

export const getAppointments = ({ userId }) => ({
  type: GET_APPOINTMENTS,
  userId,
});
