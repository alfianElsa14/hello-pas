import { registerDoctor } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'
import { registerSuccess } from './actions'
import { DOCTOR_REGISTER } from './constants'
import { toast } from 'react-hot-toast'

export function* doRegisterDoctor({data}){
    try {
        const response = yield call(registerDoctor, data)
        if (response) {
            yield put(registerSuccess());
            toast.success('Register successfully');
          } else {
            throw new Error('Register failed');
          }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}

export function* registerDoctorSaga(){
    yield takeLatest(DOCTOR_REGISTER, doRegisterDoctor)
}