import { DOCTOR_REGISTER, DOCTOR_REGISTER_SUCCESS, RESET_REGISTER_STATUS } from "./constants";

export const register = (data) => ({
    type: DOCTOR_REGISTER,
    data
})

export const registerSuccess = () => ({
    type: DOCTOR_REGISTER_SUCCESS
})

export const resetRegisterStatus = () => ({
    type: RESET_REGISTER_STATUS
})