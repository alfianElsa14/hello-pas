import { produce } from "immer";
import { SET_DOCTOR_PROFILE, SET_USER_PROFILE } from "./constants";
export const initialState = {
    userProfile: null,
    doctorProfile: null
}

const detailProfileReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch(action.type) {
            case SET_USER_PROFILE:
                draft.userProfile = action.userProfile;
                break;
            case SET_DOCTOR_PROFILE:
                draft.doctorProfile = action.doctorProfile;
                break;
        }
    })

export default detailProfileReducer;