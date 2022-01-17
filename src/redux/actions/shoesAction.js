import { ActionTypes } from '../constant/action-types'

export const shoesAction = (genData) => {
    console.log('shoes action', genData)
    return {
        type: ActionTypes.SETSHOESLIST,
        payload: genData
    }
}