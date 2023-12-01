import {
  ADD_REVIEW,
  CREATE_APPOINTMENT,
  DELETE_REVIEW,
  GET_ALL_REVIEWS,
  GET_AVAILABLE_APPOINTMENTS,
  GET_DOCTOR_BY_ID,
  SET_ALL_REVIEWS,
  SET_AVAILABLE_APPOINTMENTS,
  SET_DOCTOR_BY_ID,
} from './constants';

export const getAllReviews = (id) => ({
  type: GET_ALL_REVIEWS,
  id,
});

export const setAllReviews = (reviews) => ({
  type: SET_ALL_REVIEWS,
  reviews,
});

export const addReview = (id, data) => ({
  type: ADD_REVIEW,
  id,
  data,
});

export const deleteReview = (reviewId, doctorId) => ({
  type: DELETE_REVIEW,
  reviewId,
  doctorId,
});

export const getDoctorById = (id) => ({
  type: GET_DOCTOR_BY_ID,
  id,
});

export const setDoctorById = (doctor) => ({
  type: SET_DOCTOR_BY_ID,
  doctor,
});

export const getAvailableAppointments = (doctorId) => ({
  type: GET_AVAILABLE_APPOINTMENTS,
  doctorId,
});

export const setAvailableAppointments = (availableAppointments) => ({
  type: SET_AVAILABLE_APPOINTMENTS,
  availableAppointments,
});

export const createAppointment = (inputs, handleSuccess, handleError) => ({
  type: CREATE_APPOINTMENT,
  inputs,
  handleSuccess,
  handleError,
});
