import { GET_ALL_DOCTORS, SET_ALL_DOCTORS } from "./constants"

export const getAllDoctors = () => ({
    type: GET_ALL_DOCTORS
})

export const setAllDoctors = (doctors) => ({
    type: SET_ALL_DOCTORS,
    doctors
})