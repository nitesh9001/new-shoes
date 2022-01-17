import { ActionTypes } from '../constant/action-types'

const initalState = {
    shoes: [],
}

export const shoesReducer = (state= initalState, { type , payload }) => {
    switch(type){
        case ActionTypes.SETSHOESLIST :
            return {...state, shoes: payload};
        default :
            return state;
    }
}