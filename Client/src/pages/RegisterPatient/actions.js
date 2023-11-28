import { RESET_REGISTER_STATUS, USER_REGISTER, USER_REGISTER_SUCCESS } from "./constants";

export const register = (data) => ({
    type: USER_REGISTER,
    data
})

export const registerSuccess = () => ({
    type: USER_REGISTER_SUCCESS
})

export const resetRegisterStatus = () => ({
    type: RESET_REGISTER_STATUS
})