import {
  LOGIN_DOCTOR,
  LOGIN_USER,
  LOGOUT,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER,
  VERIFY_TOKEN,
} from '@containers/Client/constants';

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
  user,
});

export const loginUser = (data) => ({
  type: LOGIN_USER,
  data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginDoctor = (data) => ({
  type: LOGIN_DOCTOR,
  data,
});

export const verifyToken = (user, navigate) => ({
  type: VERIFY_TOKEN,
  user,
  navigate,
});
