import {
  ACCEPT_APPOINTMENT,
  CHANGE_STATUS_APPOINTMENT,
  DENY_APPOINTMENT,
  GET_ALL_DOCTORS,
  GET_APPOINTMENTS,
  REMOVE_APPOINTMENT,
  SET_ALL_DOCTORS,
  SET_APPOINTMENTS,
} from './constants';

export const getAllDoctors = () => ({
  type: GET_ALL_DOCTORS,
});

export const setAllDoctors = (doctors) => ({
  type: SET_ALL_DOCTORS,
  doctors,
});

export const setAppointments = (appointments) => ({
  type: SET_APPOINTMENTS,
  appointments,
});

export const getAppointments = ({ doctorId }) => ({
  type: GET_APPOINTMENTS,
  doctorId,
});

export const acceptAppointment = (appointmentId, handleClose) => ({
  type: ACCEPT_APPOINTMENT,
  appointmentId,
  handleClose,
});

export const denyAppointment = (appointmentId, handleClose) => ({
  type: DENY_APPOINTMENT,
  appointmentId,
  handleClose,
});

export const changeStatusAppointment = (appointmentId, status) => ({
  type: CHANGE_STATUS_APPOINTMENT,
  appointmentId,
  status,
});

export const removeAppointment = (appointmentId) => ({
  type: REMOVE_APPOINTMENT,
  appointmentId,
});
