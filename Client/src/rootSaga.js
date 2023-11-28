/* eslint-disable prettier/prettier */
import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import userAppointmentSaga from '@pages/UserAppointment/saga';
import { registerUserSaga } from '@pages/RegisterPatient/saga';
import { loginUserSaga } from '@pages/LoginPatient/saga';
import { loginDoctorSaga } from '@pages/LoginDoctor/saga';
import { registerDoctorSaga } from '@pages/RegisterDoctor/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    userAppointmentSaga(),
    registerUserSaga(),
    loginUserSaga(),
    registerDoctorSaga(),
    loginDoctorSaga()
  ]);
}
