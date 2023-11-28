import { produce } from 'immer';
import { USER_REGISTER_SUCCESS } from './constants';

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
    }
  });

export default registerUserReducer;
