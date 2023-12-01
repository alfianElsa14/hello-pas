import { produce } from 'immer';
import { CHANGE_STATUS_APPOINTMENT, SET_APPOINTMENTS, SET_MIDTRANS_TOKEN } from './constants';

export const initialState = {
  appointments: [],
  midtransToken: null,
};

export const storedKey = [];

const userAppointmentReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_APPOINTMENTS:
        draft.appointments = action.appointments;
        break;
      case SET_MIDTRANS_TOKEN:
        draft.midtransToken = action.midtransToken;
        break;
      case CHANGE_STATUS_APPOINTMENT:
        draft.appointments = draft.appointments.map((appointment) => {
          if (appointment.id === action.appointmentId) {
            return { ...appointment, status: action.status };
          }
          return appointment;
        });
        break;
      default:
        break;
    }
  });

export default userAppointmentReducer;
