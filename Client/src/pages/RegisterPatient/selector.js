import { createSelector } from "reselect"
import { initialState } from "./reducer"

const selectRegisterPatientState = (state) => state.registerPatient || initialState

export const selectRegisterSucces = createSelector(selectRegisterPatientState, (state) => state.isSucces)