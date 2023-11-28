import { setLogin, setToken, setUser } from '@containers/Client/actions'
import { LOGIN_DOCTOR, LOGIN_USER } from '@containers/Client/constants'
import { loginDoctor } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'

export function* doLoginDoctor ({ data}) {
    try {
        const response = yield call(loginDoctor, data)
        if (!response) {
            alert('Invalid email and password')
        } else {
            yield put(setUser(response.data))
            yield put(setToken(response.token))
            yield put(setLogin(true))
            alert('Login success')
        }
    } catch (error) {
        console.log(error)
        alert('Login failed')
    }
}

export function* loginDoctorSaga() {
    yield takeLatest(LOGIN_DOCTOR, doLoginDoctor)
}