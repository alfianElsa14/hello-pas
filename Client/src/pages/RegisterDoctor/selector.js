import { createSelector } from "reselect"
import { initialState } from "./reducer"

const selectRegisterDoctorState = (state) => state.registerDoctor || initialState

export const selectRegisterDoctorSucces = createSelector(selectRegisterDoctorState, (state) => state.isSucces)