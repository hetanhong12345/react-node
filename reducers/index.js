import { combineReducers } from 'redux'
import user from './user'
import {  routerReducer } from 'react-router-redux'



//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    user,
    routing: routerReducer
})
//debugger
export default rootReducer
