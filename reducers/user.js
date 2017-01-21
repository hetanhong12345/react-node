/**
 * Created by Administrator on 2016/9/7.
 */

const LOGIN = 'LOGIN';
const LOGOUT ='LOGOUT'
const INIT = {
    userName: '',
    loginStatus: false
}
export default function login(state = INIT, action = {}) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({},state,{
                userName:action.userName,
                loginStatus:action.loginStatus
            })
        default:
            return state
    }
}