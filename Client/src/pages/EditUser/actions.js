import { EDIT_DOCTOR, EDIT_USER, GET_DOCTOR_BY_ID, GET_USER_BY_ID, SET_DOCTOR_BY_ID, SET_USER_BY_ID } from "./constants";

export const getUsertById = (id) => ({
    type: GET_USER_BY_ID,
    id
})

export const setUserById = (userData) => ({
    type: SET_USER_BY_ID,
    userData
})

export const editUser = (id, data) => ({
    type: EDIT_USER,
    id,
    data
})

export const getDoctorById = (id) => ({
    type: GET_DOCTOR_BY_ID,
    id
})

export const setDoctorById = (userData) => ({
    type: SET_DOCTOR_BY_ID,
    userData
})

export const editDoctor = (id, data) => ({
    type: EDIT_DOCTOR,
    id,
    data
})