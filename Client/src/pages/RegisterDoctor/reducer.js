import { produce } from 'immer';
import { DOCTOR_REGISTER_SUCCESS } from './constants';

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
    }
  });

export default registerDoctorReducer;
