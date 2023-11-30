import { editUser, userById, userProfile } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { EDIT_USER, GET_USER_BY_ID } from "./constants";
import { setUserById } from "./actions";
import Swal from "sweetalert2";
import { setUserProfile } from "@pages/Profile/actions";

export function* doEditUser({data}) {
    try {
        const response = yield call(editUser, data)
        Swal.fire("sukses edit profile");
        const result = yield call(userProfile)
        yield put(setUserProfile(result))
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Email or Password required";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("failed edit profile");
        }
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