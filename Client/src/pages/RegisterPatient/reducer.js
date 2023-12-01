import { produce } from 'immer';
import { RESET_REGISTER_STATUS, USER_REGISTER_SUCCESS } from './constants';

export const initialState = {
  user: {},
  isSucces: false,
  isError: false,
  message: '',
};

const registerUserReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case USER_REGISTER_SUCCESS:
        draft.isSucces = true;
        draft.message = 'Register Successfully';
        break;
      case RESET_REGISTER_STATUS:
        draft.isSucces = false;
        break;
    }
  });

export default registerUserReducer;
