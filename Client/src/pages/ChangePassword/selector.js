import { createSelector } from "reselect";
import { initialState } from '@pages/ChangePassword/reducer';

const selectChangePasswordState = (state) => state.changePassword || initialState

export const selectChangePassword = createSelector(selectChangePasswordState, (state) => state.isChange)
