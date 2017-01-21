/**
 * Created by Administrator on 2016/9/7.
 */

const LOGIN = 'LOGIN'
const INIT = {
    employeeName: '',
    loginStatus: false
}
export default function login(state = INIT, action = {}) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({},state,{
                employeeName:action.employeeName,
                loginStatus:action.loginStatus
            })
        default:
            return state
    }
}