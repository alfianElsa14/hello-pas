/* eslint-disable prettier/prettier */
import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import userAppointmentSaga from '@pages/UserAppointment/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    userAppointmentSaga(),
  ]);
}
