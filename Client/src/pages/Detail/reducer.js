import { produce } from 'immer'
import { SET_ALL_REVIEWS } from './constants'

export const initialState = {
    reviews: []
}

export const storedKey = []

const detailReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_ALL_REVIEWS:
                draft.reviews = action.reviews
                break;
            default:
                break;
        }
    })

export default detailReducer