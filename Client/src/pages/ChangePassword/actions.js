import { CHANGE_PASSWORD_DOCTOR, CHANGE_PASSWORD_USER, RESET_CHANGE_PASSWORD, SET_CHANGE_PASSWORD_DOCTOR, SET_CHANGE_PASSWORD_USER } from "./constants";

export const changePasswordUser = data => ({
    type: CHANGE_PASSWORD_USER,
    data
})

export const setChangePasswordUser = () => ({
    type: SET_CHANGE_PASSWORD_USER,
})

export const changePasswordDoctor = data => ({
    type: CHANGE_PASSWORD_DOCTOR,
    data
})

export const setChangePasswordDoctor = () => ({
    type: SET_CHANGE_PASSWORD_DOCTOR
})

export const resetChangePassword = () => ({
    type: RESET_CHANGE_PASSWORD
})