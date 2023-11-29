import { GET_DOCTOR_PROFILE, GET_USER_PROFILE, SET_DOCTOR_PROFILE, SET_USER_PROFILE } from "./constants";

export const getUserProfile = () => ({
    type: GET_USER_PROFILE,
})

export const setUserProfile = userProfile => ({
    type: SET_USER_PROFILE,
    userProfile
})

export const getDoctorProfile = () => ({
    type: GET_DOCTOR_PROFILE,
})

export const setDoctorProfile = doctorProfile => ({
    type: SET_DOCTOR_PROFILE,
    doctorProfile
})