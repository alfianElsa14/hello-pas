import { produce } from 'immer'
import { SET_ALL_REVIEWS, SET_DOCTOR_BY_ID } from './constants'

export const initialState = {
    reviews: [],
    doctor: {}
}

export const storedKey = []

const detailReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_ALL_REVIEWS:
                draft.reviews = action.reviews
                break;
            case SET_DOCTOR_BY_ID:
                draft.doctor = action.doctor
                break;
            default:
                break;
        }
    })

export default detailReducer