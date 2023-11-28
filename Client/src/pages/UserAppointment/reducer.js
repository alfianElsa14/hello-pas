import { produce } from 'immer';
import { SET_APPOINTMENTS } from './constants';

export const initialState = {
  appointments: [],
};

export const storedKey = [];

const userAppointmentReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_APPOINTMENTS:
        draft.appointments = action.appointments;
        break;
    }
  });

export default userAppointmentReducer;
