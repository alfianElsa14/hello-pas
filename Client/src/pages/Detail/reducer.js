import { produce } from 'immer';
import { SET_ALL_REVIEWS, SET_AVAILABLE_APPOINTMENTS, SET_DOCTOR_BY_ID } from './constants';

export const initialState = {
  reviews: [],
  doctor: {},
  availableAppointments: [],
};

export const storedKey = [];

const detailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_REVIEWS:
        draft.reviews = action.reviews;
        break;
      case SET_DOCTOR_BY_ID:
        draft.doctor = action.doctor;
        break;
      case SET_AVAILABLE_APPOINTMENTS:
        draft.availableAppointments = action.availableAppointments;
        break;
      default:
        break;
    }
  });

export default detailReducer;
