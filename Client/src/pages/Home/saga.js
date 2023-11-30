import { getAllDoctors } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setAllDoctors } from "./actions";
import { GET_ALL_DOCTORS } from "./constants";

export function* doGetAllDoctors() {
    try {
        const response = yield call(getAllDoctors);
        yield put(setAllDoctors(response))
    } catch (error) {
        console.log(error);
    }
}

export function* homeSaga() {
    yield takeLatest(GET_ALL_DOCTORS, doGetAllDoctors)
}