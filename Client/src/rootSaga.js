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
import { profileSaga } from '@pages/Profile/saga';
import { clientSaga } from '@containers/Client/saga';
import { homeSaga } from '@pages/Home/saga';
import { changePasswordSaga } from '@pages/ChangePassword/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    clientSaga(),
    userAppointmentSaga(),
    detailSaga(),
    registerUserSaga(),
    loginUserSaga(),
    registerDoctorSaga(),
    loginDoctorSaga(),
    profileSaga(),
    editSaga(),
    homeSaga(),
    changePasswordSaga(),
  ]);
}
