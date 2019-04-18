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
        case(actionTypes.checkAuthState):
            const expirationDate = localStorage.getItem('expirationDate')
            const currentDate = new Date()
            if(localStorage.getItem('token')){
                if(currentDate>=expirationDate){
                    localStorage.removeItem('userId')
                    localStorage.removeItem('token')
                    localStorage.removeItem('expirationDate')
                    return { //expired: 
                        ...state,
                        userId:null,
                        token:null,
                        loading: false,
                        isLoggedIn: false
                    }
                }else{
                    return {
                        ...state,
                        token:localStorage.getItem('token'),
                        userId:localStorage.getItem('userId'),
                        loading:false,
                        isLoggedIn:true
                    }
                }
            }
            else{
                return state
            }

        default:
            return state
    }
}

export default reducer