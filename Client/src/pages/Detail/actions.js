import { ADD_REVIEW, DELETE_REVIEW, GET_ALL_REVIEWS, SET_ALL_REVIEWS } from "./constants";

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

export const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})