import { createSelector } from 'reselect';
import { initialState  } from './reducer';

const selectUserDataState = (state) => state.profile || initialState;

export const selectUserData = createSelector(selectUserDataState, (state) => state.userData);
