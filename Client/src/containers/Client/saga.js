import { testValidateTokenDoctor, testValidateTokenUser } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'
import { setLogin, setToken, setUser } from './actions'
import { setLoading } from '@containers/App/actions'
import { VERIFY_TOKEN } from './constants'

export function* doVerifyToken({user, navigate}) {
    yield put(setLoading(true))
    try {
        if (user.role === 'user') {
            yield call(testValidateTokenUser, user)
        } else if (user.role === 'doctor') {
            yield call(testValidateTokenDoctor, user)
        }
    } catch (error) {
        yield put(setLogin(false)),
        yield put(setToken(null)),
        yield put(setUser(null)),
        yield call(navigate, '/login')
    }
    yield put(setLoading(false))
}

export function* clientSaga(){
    yield takeLatest(VERIFY_TOKEN, doVerifyToken)
}