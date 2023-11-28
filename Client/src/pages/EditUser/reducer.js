import { produce } from 'immer'
import { SET_USER_BY_ID } from './constants';

export const initialState = {
    userData: {},
}

export const storedKey = [];

const profileReducer = (state = initialState, action) => 
produce(state, (draft) => {
    switch (action.type) {
        case SET_USER_BY_ID:
            draft.userData = action.userData
            break;
        default:
            break;
    }
})

export default profileReducer