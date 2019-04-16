import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false
}

const reducer =(state=initialState,action)=>{
    switch(action.type) {
        case(actionTypes.auth_start):
            return {
                ...state,
                loading: true
            }
        case(actionTypes.auth_fail):
            return {
                ...state,
                error:action.error,
                loading: false
            }
        case(actionTypes.auth_success):
            return {
                ...state,
                userId:action.authData.localId,
                token:action.authData.idToken,
                loading: false
            }
        default:
            return state
    }
}

export default reducer