import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    isLoggedIn:false
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
            localStorage.setItem('userId',action.authData.localId)
            localStorage.setItem('token',action.authData.idToken)
            return {
                ...state,
                userId:action.authData.localId,
                token:action.authData.idToken,
                loading: false,
                isLoggedIn: true
            }
        case(actionTypes.logout):
            return {
                ...state,
                userId:null,
                token:null,
                loading: false,
                isLoggedIn: false
            }
        default:
            return state
    }
}

export default reducer