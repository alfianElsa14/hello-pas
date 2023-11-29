import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { appointmentStatus, getAppointmentsByUserID, midtransPayment } from '@domain/api';
import { EDIT_STATUS_APPOINTMENTS, GET_APPOINTMENTS, MIDTRANS_PAYMENT } from '@pages/UserAppointment/constants';
import { setAppointments, setMidtransToken } from '@pages/UserAppointment/actions';

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

export function* doMidtransPayment({ id, cbEditStatus }) {
  try {
    const result = yield call(midtransPayment, id)
    yield put(setMidtransToken(result.token))

    window.snap.pay(result.token, {
      onSuccess: () => {
        cbEditStatus && cbEditStatus()
      },
      onPending: function (result) {
        console.log('Pembayaran tertunda:', result);
      },
      onError: function (result) {
        console.log('Pembayaran gagal:', result);
      },
      onClose: function () {
        console.log('Widget ditutup tanpa menyelesaikan pembayaran');
      }
    });

  } catch (error) {
    console.log(error);
  }
}

export function* doEditStatusAppointment({ id }) {
  try {
    const response = yield call(appointmentStatus, id)
  } catch (error) {
    console.log(error);
  }
}

export default function* userAppointmentSaga() {
  yield takeLatest(GET_APPOINTMENTS, doGetAppointments);
  yield takeLatest(MIDTRANS_PAYMENT, doMidtransPayment);
  yield takeLatest(EDIT_STATUS_APPOINTMENTS, doEditStatusAppointment)
}
