import * as actionTypes from './actionTypes'
import Axios from 'axios';

export const authStart = ()=>{
    return {
        type: actionTypes.auth_start
    }
}

export const authSuccess = (authData)=>{
    return {
        type: actionTypes.auth_success,
        authData
    }
}

export const authFail = (error)=>{
    return {
        type: actionTypes.auth_fail,
        error
    }
}

//sign up
export const auth = (email,password)=>{
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    return dispatch=>{
        dispatch(authStart())
        Axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAIOOYgeJMUiRLB9RNp5PfDY87H_rkUlbk',authData)
            .then(res=>{
                console.log(res)
                dispatch(authSuccess(res.data))
            })
            .catch(err=>{
                dispatch(authFail(err))
            })
    }
}
export const authSignIn = (email,password)=>{
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    return dispatch=>{
        dispatch(authStart())
        Axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAIOOYgeJMUiRLB9RNp5PfDY87H_rkUlbk',authData)
            .then(res=>{
                console.log(res)
                dispatch(authSuccess(res.data))
            })
            .catch(err=>{
                dispatch(authFail(err))
            })
    }
}