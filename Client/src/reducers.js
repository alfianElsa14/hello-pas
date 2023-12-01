import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import userAppointmentReducer, { storedKey as storedUserAppointmentState } from '@pages/UserAppointment/reducer';
import languageReducer from '@containers/Language/reducer';

import registerUserReducer from '@pages/RegisterPatient/reducer';
import registerDoctorReducer from '@pages/RegisterDoctor/reducer';
import detailReducer from '@pages/Detail/reducer';
import profileReducer from '@pages/EditUser/reducer';
import { mapWithPersistor } from './persistence';
import detailProfileReducer from '@pages/Profile/reducer';
import homeReducer from '@pages/Home/reducer';
import changePasswordReducer from '@pages/ChangePassword/reducer';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  home: { reducer: homeReducer },
  userAppointment: { reducer: userAppointmentReducer, whitelist: storedUserAppointmentState },
  registerPatient: { reducer: registerUserReducer },
  registerDoctor: { reducer: registerDoctorReducer },
  detail: { reducer: detailReducer },
  profile: { reducer: profileReducer },
  detailProfile: {reducer: detailProfileReducer},
  changePassword: {reducer: changePasswordReducer}
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
