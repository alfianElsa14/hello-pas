import { editUser, userById } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { EDIT_USER, GET_USER_BY_ID } from "./constants";
import { setUserById } from "./actions";
import Swal from "sweetalert2";

export function* doEditUser({id, data}) {
    try {
        const response = yield call(editUser, id, data)
        Swal.fire("sukses edit profile");
        const result = yield call(userById, id)
        yield put(setUserById(result))
    } catch (error) {
        console.log(error);
    }
}

export function* doGetUserById({id}) {
    try {
        const response = yield call(userById, id)
        yield put(setUserById(response))
    } catch (error) {
        console.log();
    }
}

export function* editSaga() {
    yield takeLatest(EDIT_USER, doEditUser)
    yield takeLatest(GET_USER_BY_ID, doGetUserById)
}