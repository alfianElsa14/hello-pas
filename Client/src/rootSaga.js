/* eslint-disable prettier/prettier */
import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import userAppointmentSaga from '@pages/UserAppointment/saga';
import { detailSaga } from '@pages/Detail/saga';
import { registerUserSaga } from '@pages/RegisterPatient/saga';
import { loginUserSaga } from '@pages/LoginPatient/saga';
import { loginDoctorSaga } from '@pages/LoginDoctor/saga';
import { registerDoctorSaga } from '@pages/RegisterDoctor/saga';
import { editSaga } from '@pages/EditUser/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    userAppointmentSaga(),
    detailSaga(),
    registerUserSaga(),
    loginUserSaga(),
    registerDoctorSaga(),
    loginDoctorSaga(),
    editSaga()
  ]);
}
