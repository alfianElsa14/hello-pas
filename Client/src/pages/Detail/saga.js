import { addReview, deleteReview, getAllReviews } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setAllReviews } from "./actions";
import { ADD_REVIEW, DELETE_REVIEW, GET_ALL_REVIEWS } from "./constants";
import Swal from "sweetalert2";

export function* doGetAllReviews({ id }) {
    try {
        const response = yield call(getAllReviews, id)
        yield put(setAllReviews(response))
        console.log(response, "<<<<< di saga");
    } catch (error) {
        console.log(error);
    }
}

export function* doAddReviews({ id, data }) {
    try {
        const response = yield call(addReview, id, data)
        const result = yield call(getAllReviews, id)
        yield put(setAllReviews(result))
    } catch (error) {
        console.log(error);
    }
}

export function* doDeleteReview({ id }) {
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
            yield call(deleteReview, id);
      
            Swal.fire({
              title: 'Deleted!',
              text: 'Your review has been deleted.',
              icon: 'success',
            });
            const updatedReviews = yield call(getAllReviews, id);
            yield put(setAllReviews(updatedReviews));
        }    
    } catch (error) {
        console.log(error);
    }
}



export function* detailSaga() {
    yield takeLatest(GET_ALL_REVIEWS, doGetAllReviews)
    yield takeLatest(ADD_REVIEW, doAddReviews)
    yield takeLatest(DELETE_REVIEW, doDeleteReview)
}