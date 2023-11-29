import { EDIT_STATUS_APPOINTMENTS, GET_APPOINTMENTS, MIDTRANS_PAYMENT, SET_APPOINTMENTS, SET_MIDTRANS_TOKEN } from '@pages/UserAppointment/constants';

export const setAppointments = (appointments) => ({
  type: SET_APPOINTMENTS,
  appointments,
});

export const getAppointments = ({ userId }) => ({
  type: GET_APPOINTMENTS,
  userId,
});

export const midtransPayment = (id, cbEditStatus) => ({
  type: MIDTRANS_PAYMENT,
  id,
  cbEditStatus
})

export const setMidtransToken = (midtransToken) => ({
  type: SET_MIDTRANS_TOKEN,
  midtransToken
})

export const editStatusAppointment = (id) => ({
  type: EDIT_STATUS_APPOINTMENTS,
  id
})

