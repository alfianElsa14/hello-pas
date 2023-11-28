import { setLogin, setToken, setUser } from '@containers/Client/actions'
import { LOGIN_USER } from '@containers/Client/constants'
import { loginUser } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'

export function* doLoginUser ({ data}) {
    try {
        const response = yield call(loginUser, data)
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

export function* loginUserSaga() {
    yield takeLatest(LOGIN_USER, doLoginUser)
}