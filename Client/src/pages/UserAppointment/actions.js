import {
  CHANGE_STATUS_APPOINTMENT,
  EDIT_STATUS_APPOINTMENTS,
  GET_APPOINTMENTS,
  MIDTRANS_PAYMENT,
  SET_APPOINTMENTS,
  SET_MIDTRANS_TOKEN,
} from '@pages/UserAppointment/constants';

export const setAppointments = (appointments) => ({
  type: SET_APPOINTMENTS,
  appointments,
});

export const getAppointments = ({ userId }) => ({
  type: GET_APPOINTMENTS,
  userId,
});

export const midtransPayment = (appointmentId, cbEditStatus) => ({
  type: MIDTRANS_PAYMENT,
  appointmentId,
  cbEditStatus,
});

export const setMidtransToken = (midtransToken) => ({
  type: SET_MIDTRANS_TOKEN,
  midtransToken,
});

export const editStatusAppointment = (appointmentId) => ({
  type: EDIT_STATUS_APPOINTMENTS,
  appointmentId,
});

export const changeStatusAppointment = (appointmentId, status) => ({
  type: CHANGE_STATUS_APPOINTMENT,
  appointmentId,
  status,
});
