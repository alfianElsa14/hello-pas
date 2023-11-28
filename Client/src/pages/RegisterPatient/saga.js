import { registerUser } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'
import { registerSuccess } from './actions'
import { USER_REGISTER } from './constants'

export function* doRegister({data}){
    try {
        const response = yield call(registerUser, data)
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

export function* registerUserSaga(){
    yield takeLatest(USER_REGISTER, doRegister)
}