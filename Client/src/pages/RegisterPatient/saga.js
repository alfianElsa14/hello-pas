import { registerUser } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'
import { registerSuccess } from './actions'
import { USER_REGISTER } from './constants'
import { toast } from 'react-hot-toast'


export function* doRegister({data}){
    try {
        const response = yield call(registerUser, data)
        if (response) {
            yield put(registerSuccess());
            toast.success('Register successfully');
          } else {
            throw new Error('Register failed');
          }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export function* registerUserSaga(){
    yield takeLatest(USER_REGISTER, doRegister)
}