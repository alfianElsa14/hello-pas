import { produce } from 'immer';
import { DOCTOR_REGISTER_SUCCESS, RESET_REGISTER_STATUS } from './constants';

export const initialState = {
  user: {},
  isSucces: false,
  isError: false,
  message: '',
};

const registerDoctorReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DOCTOR_REGISTER_SUCCESS:
        draft.isSucces = true;
        draft.message = 'Register Successfully';
        break;
      case RESET_REGISTER_STATUS:
        draft.isSucces = false;
        break;
    }
  });

export default registerDoctorReducer;
