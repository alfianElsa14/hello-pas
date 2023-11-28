import { EDIT_USER, GET_USER_BY_ID, SET_USER_BY_ID } from "./constants";

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