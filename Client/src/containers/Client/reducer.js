import { produce } from 'immer';

import { LOGOUT, SET_LOGIN, SET_TOKEN, SET_USER } from '@containers/Client/constants';

export const initialState = {
  login: false,
  token: null,
  user: null,
};

export const storedKey = ['token', 'login', 'user'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case SET_USER:
        draft.user = action.user;
        break;
      case LOGOUT:
        draft.user = null;
        draft.token = null;
        draft.login = false;
        break;
    }
  });

export default clientReducer;
