import { doctorProfile, userProfile } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'
import { setDoctorProfile, setUserProfile } from './actions'
import toast from 'react-hot-toast'
import { GET_DOCTOR_PROFILE, GET_USER_PROFILE } from './constants'

export function* doGetUserProfile(){
    try {
        const response = yield call(userProfile)
        // console.log(response, '<<<<<<<< saga')
        yield put(setUserProfile(response))
    } catch (error) {
        console.log(error)
        toast.error('Error fetching')
    }
}

export function* doGetDoctorProfile(){
    try {
        const response = yield call(doctorProfile)
        console.log(response)
        yield put(setDoctorProfile(response))
    } catch (error) {
        console.log(error)
        toast.error('Error fetching')
    }
}

export function* profileSaga() {
    yield takeLatest(GET_USER_PROFILE, doGetUserProfile)
    yield takeLatest(GET_DOCTOR_PROFILE, doGetDoctorProfile)
}