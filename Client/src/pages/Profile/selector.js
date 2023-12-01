import { createSelector } from "reselect";
import { initialState } from '@pages/Profile/reducer';

const selectProfileState = (state) => state.detailProfile || initialState

export const selectUserProfile = createSelector(selectProfileState, (state) => state.userProfile)
export const selectDoctorProfile = createSelector(selectProfileState, (state) => state.doctorProfile)
