import { createSelector } from 'reselect';
import { initialState } from '@pages/UserAppointment/reducer';

const selectUserAppointmentState = (state) => state.userAppointment || initialState;

export const selectAppointments = createSelector(selectUserAppointmentState, (state) => state.appointments);
export const selectAcceptedAppointments = createSelector(
  selectUserAppointmentState,
  (state) => state.acceptedAppointments
);
export const selectMidtransToken = createSelector(selectUserAppointmentState, (state) => state.midtransToken);
