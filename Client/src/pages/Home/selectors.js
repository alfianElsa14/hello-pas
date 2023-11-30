import { createSelector } from 'reselect';
import { initialState  } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectDoctors = createSelector(selectHomeState, (state) => state.doctors);