import { produce } from 'immer';
import { CHANGE_STATUS_APPOINTMENT, REMOVE_APPOINTMENT, SET_ALL_DOCTORS, SET_APPOINTMENTS } from './constants';

export const initialState = {
  doctors: [],
  appointments: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_DOCTORS:
        draft.doctors = action.doctors;
        break;
      case SET_APPOINTMENTS:
        draft.appointments = action.appointments;
        break;
      case CHANGE_STATUS_APPOINTMENT:
        draft.appointments = draft.appointments.map((appointment) => {
          if (appointment.id === action.appointmentId) {
            return { ...appointment, status: action.status };
          }
          return appointment;
        });
        break;
      case REMOVE_APPOINTMENT:
        draft.appointments = draft.appointments.filter((appointment) => appointment.id !== action.appointmentId);
        break;

      default:
        break;
    }
  });

export default homeReducer;
