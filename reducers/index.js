import { combineReducers } from 'redux'
import user from './user'
import {  routerReducer } from 'react-router-redux'



//ʹ��redux��combineReducers����������reducer�������
const rootReducer = combineReducers({
    user,
    routing: routerReducer
})
//debugger
export default rootReducer
