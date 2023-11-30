import { changePasswordDoctor, changePasswordUser } from '@domain/api'
import toast from 'react-hot-toast'
import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { resetChangePassword, setChangePasswordDoctor, setChangePasswordUser } from './actions'
import { CHANGE_PASSWORD_DOCTOR, CHANGE_PASSWORD_USER } from './constants'

export function* doChangePasswordUser({data}) {
    try {
        const response = yield call(changePasswordUser, data)
        yield put(setChangePasswordUser(response))
        toast.success('Succesfully change password user')

        yield delay(3000)
        yield put(resetChangePassword())
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

export function* doChangePasswordDoctor({data}) {
    try {
        const response = yield call(changePasswordDoctor, data)
        yield put(setChangePasswordDoctor(response))
        toast.success('Succesfully change password doctor')

        yield delay(2000)
        yield put(resetChangePassword())
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

export function* changePasswordSaga(){
    yield takeLatest(CHANGE_PASSWORD_USER, doChangePasswordUser)
    yield takeLatest(CHANGE_PASSWORD_DOCTOR, doChangePasswordDoctor)
}