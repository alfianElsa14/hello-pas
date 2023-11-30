import { produce } from 'immer'
import { SET_ALL_DOCTORS } from './constants';

export const initialState = {
    doctors: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_ALL_DOCTORS:
                draft.doctors = action.doctors;
                break;
            default:
                break;
        }
    })

export default homeReducer;