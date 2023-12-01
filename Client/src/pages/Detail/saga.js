import {
  addReview,
  createAppointment,
  deleteReview,
  getAllReviews,
  getAvailableAppointments,
  getDoctorById,
} from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import { setAllReviews, setAvailableAppointments, setDoctorById } from './actions';
import {
  ADD_REVIEW,
  CREATE_APPOINTMENT,
  DELETE_REVIEW,
  GET_ALL_REVIEWS,
  GET_AVAILABLE_APPOINTMENTS,
  GET_DOCTOR_BY_ID,
} from './constants';

export function* doGetAllReviews({ id }) {
  try {
    const response = yield call(getAllReviews, id);
    yield put(setAllReviews(response));
  } catch (error) {
    console.log(error);
  }
}

export function* doAddReviews({ id, data }) {
  try {
    yield call(addReview, id, data);
    const result = yield call(getAllReviews, id);
    yield put(setAllReviews(result));
  } catch (error) {
    console.log(error);
  }
}

export function* doDeleteReview({ reviewId, doctorId }) {
  try {
    const result = yield Swal.fire({
      title: 'Are you sure',
      text: 'To delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      yield call(deleteReview, reviewId);

      Swal.fire({
        title: 'Deleted!',
        text: 'Your review has been deleted.',
        icon: 'success',
      });
      const updatedReviews = yield call(getAllReviews, doctorId);
      yield put(setAllReviews(updatedReviews));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* doGetDoctorById({ id }) {
  try {
    const response = yield call(getDoctorById, id);
    yield put(setDoctorById(response));
    const result = yield call(getAllReviews, id);
    yield put(setAllReviews(result));
  } catch (error) {
    console.log(error);
  }
}

function* doGetAvailableAppointments({ doctorId }) {
  try {
    const response = yield call(getAvailableAppointments, doctorId);
    yield put(setAvailableAppointments(response.data));
  } catch (error) {
    // error
  }
}

function* doCreateAppointment({ inputs, handleSuccess, handleError }) {
  try {
    yield call(createAppointment, inputs);
    yield call(handleSuccess);
  } catch (error) {
    // error
    yield call(handleError, error.response.data.message);
  }
}

export function* detailSaga() {
  yield takeLatest(GET_ALL_REVIEWS, doGetAllReviews);
  yield takeLatest(ADD_REVIEW, doAddReviews);
  yield takeLatest(DELETE_REVIEW, doDeleteReview);
  yield takeLatest(GET_DOCTOR_BY_ID, doGetDoctorById);
  yield takeLatest(GET_AVAILABLE_APPOINTMENTS, doGetAvailableAppointments);
  yield takeLatest(CREATE_APPOINTMENT, doCreateAppointment);
}
