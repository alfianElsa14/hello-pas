import { setLogin, setToken, setUser } from '@containers/Client/actions'
import { LOGIN_DOCTOR, LOGIN_USER } from '@containers/Client/constants'
import { loginDoctor } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'

export function* doLoginDoctor ({ data}) {
    try {
        const response = yield call(loginDoctor, data)
        if (!response) {
            toast.error('Invalid email and password')
        } else {
            const user = response.data;
            user.role = 'doctor'
            yield put(setUser(user))
            yield put(setToken(response.token)) 
            yield put(setLogin(true))
            toast.success('Login success')
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}

export function* loginDoctorSaga() {
    yield takeLatest(LOGIN_DOCTOR, doLoginDoctor)
}