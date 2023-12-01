import { setLogin, setToken, setUser } from '@containers/Client/actions'
import { LOGIN_USER } from '@containers/Client/constants'
import { loginUser } from '@domain/api'
import { call, put, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'


export function* doLoginUser ({ data}) {
    try {
        const response = yield call(loginUser, data)
        if (!response) {
            toast.error('Invalid email and password')
        } else {
            const user = response.data;
            user.role = 'user'
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

export function* loginUserSaga() {
    yield takeLatest(LOGIN_USER, doLoginUser)
}