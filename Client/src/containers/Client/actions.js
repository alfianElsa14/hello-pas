import { LOGIN_DOCTOR, LOGIN_USER, LOGOUT_USER, SET_LOGIN, SET_TOKEN, SET_USER } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUser = (user) => ({
  type: SET_USER,
  user
})

export const loginUser = (data) => ({
  type: LOGIN_USER,
  data
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})

export const loginDoctor = (data) => ({
  type: LOGIN_DOCTOR,
  data
})