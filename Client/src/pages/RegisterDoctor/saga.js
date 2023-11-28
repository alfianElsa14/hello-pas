import { registerDoctor } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'
import { registerSuccess } from './actions'
import { DOCTOR_REGISTER } from './constants'

export function* doRegisterDoctor({data}){
    try {
        const response = yield call(registerDoctor, data)
        if (response) {
            yield put(registerSuccess());
            alert('Berhasil register');
          } else {
            throw new Error('Registrasi gagal');
          }
    } catch (error) {
        console.log(error)
    }
}

export function* registerDoctorSaga(){
    yield takeLatest(DOCTOR_REGISTER, doRegisterDoctor)
}