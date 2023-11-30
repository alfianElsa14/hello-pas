import { createSelector } from 'reselect';
import { initialState  } from './reducer';

const selectDetailState = (state) => state.detail || initialState;

export const selectReviews = createSelector(selectDetailState, (state) => state.reviews);

export const selectDoctorById = createSelector(selectDetailState, (state) => state.doctor)
