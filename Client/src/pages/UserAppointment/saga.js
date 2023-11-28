import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getAppointmentsByUserID } from '@domain/api';
import { GET_APPOINTMENTS } from '@pages/UserAppointment/constants';
import { setAppointments } from '@pages/UserAppointment/actions';

function* doGetAppointments({ userId }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getAppointmentsByUserID, userId);
    yield put(setAppointments(response.data));
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

export default function* userAppointmentSaga() {
  yield takeLatest(GET_APPOINTMENTS, doGetAppointments);
}
