import { call, put, takeLatest } from 'redux-saga/effects';

import { acceptAppointment, denyAppointment, getAllDoctors, getAppointmentsByDoctorID } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { changeStatusAppointment, removeAppointment, setAllDoctors, setAppointments } from './actions';
import { ACCEPT_APPOINTMENT, DENY_APPOINTMENT, GET_ALL_DOCTORS, GET_APPOINTMENTS } from './constants';

function* doGetAllDoctors() {
  try {
    const response = yield call(getAllDoctors);
    yield put(setAllDoctors(response));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function* doGetAppointments({ doctorId }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getAppointmentsByDoctorID, doctorId);
    yield put(setAppointments(response.data));
  } catch (error) {
    // console.error(error);
  }
  yield put(setLoading(false));
}

function* doAcceptAppointment({ appointmentId, handleClose }) {
  yield put(setLoading(true));
  try {
    yield call(acceptAppointment, appointmentId);
    yield put(changeStatusAppointment(appointmentId, 'accepted'));
    yield call(handleClose);
  } catch (error) {
    // console.error(error);
  }
  yield put(setLoading(false));
}

function* doDenyAppointment({ appointmentId, handleClose }) {
  yield put(setLoading(true));
  try {
    yield call(denyAppointment, appointmentId);
    yield put(removeAppointment(appointmentId));
    yield call(handleClose);
  } catch (error) {
    // console.error(error);
  }
  yield put(setLoading(false));
}

export function* homeSaga() {
  yield takeLatest(GET_ALL_DOCTORS, doGetAllDoctors);
  yield takeLatest(GET_APPOINTMENTS, doGetAppointments);
  yield takeLatest(ACCEPT_APPOINTMENT, doAcceptAppointment);
  yield takeLatest(DENY_APPOINTMENT, doDenyAppointment);
}
