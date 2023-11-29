import { produce } from 'immer';
import { SET_APPOINTMENTS, SET_MIDTRANS_TOKEN } from './constants';

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
        draft.midtransToken = action.midtransToken
        break;
    }
  });

export default userAppointmentReducer;
