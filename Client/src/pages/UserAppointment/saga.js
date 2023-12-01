/* eslint-disable no-console */
import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { payAppointment, getAppointmentsByUserID, midtransPayment } from '@domain/api';
import { EDIT_STATUS_APPOINTMENTS, GET_APPOINTMENTS, MIDTRANS_PAYMENT } from '@pages/UserAppointment/constants';
import { changeStatusAppointment, setAppointments, setMidtransToken } from '@pages/UserAppointment/actions';

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

export function* doMidtransPayment({ appointmentId, cbEditStatus }) {
  try {
    const result = yield call(midtransPayment, appointmentId);
    yield put(setMidtransToken(result.token));

    window.snap.pay(result.token, {
      onSuccess: () => {
        cbEditStatus && cbEditStatus();
      },
      onPending: (result2) => {
        console.log('Pembayaran tertunda:', result2);
      },
      onError: (result2) => {
        console.log('Pembayaran gagal:', result2);
      },
      onClose: () => {
        console.log('Widget ditutup tanpa menyelesaikan pembayaran');
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function* doEditStatusAppointment({ appointmentId }) {
  try {
    yield call(payAppointment, appointmentId);
    yield put(changeStatusAppointment(appointmentId, 'paid'));
  } catch (error) {
    console.log(error);
  }
}

export default function* userAppointmentSaga() {
  yield takeLatest(GET_APPOINTMENTS, doGetAppointments);
  yield takeLatest(MIDTRANS_PAYMENT, doMidtransPayment);
  yield takeLatest(EDIT_STATUS_APPOINTMENTS, doEditStatusAppointment);
}
