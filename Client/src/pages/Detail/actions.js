import { ADD_REVIEW, DELETE_REVIEW, GET_ALL_REVIEWS, GET_DOCTOR_BY_ID, SET_ALL_REVIEWS, SET_DOCTOR_BY_ID } from "./constants";

export const getAllReviews = (id) => ({
    type: GET_ALL_REVIEWS,
    id
})

export const setAllReviews = (reviews) => ({
    type: SET_ALL_REVIEWS,
    reviews
})

export const addReview = (id, data) => ({
    type: ADD_REVIEW,
    id,
    data
})

export const deleteReview = (reviewId, doctorId) => ({
    type: DELETE_REVIEW,
    reviewId,
    doctorId
})

export const getDoctorById = (id) => ({
    type: GET_DOCTOR_BY_ID,
    id
})

export const setDoctorById = (doctor) => ({
    type: SET_DOCTOR_BY_ID,
    doctor
})