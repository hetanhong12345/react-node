/**
 * Created by Administrator on 2016/8/9.
 */

/*登录成功或者退出登录*/
export function LoginAction({employeeName,loginStatus}){
    return {
        employeeName,
        loginStatus,
        type: 'LOGIN'
    }
}

export function LogoutAction({employeeName,loginStatus}){
    return {
        employeeName,
        loginStatus,
        type: 'LOGOUT'
    }
}
export function GetStore(){
    return(dispatch,getState) =>{
        console.log(getState())
        return {
            type: 'OTHER'
        }
    }
}
