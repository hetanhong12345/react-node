/**
 * Created by Administrator on 2016/9/7.
 */
import Main from './../container/Main'
import Index from './../container/Index'
import Login from './../container/Login'
import OtherManage from './../container/OtherManage'
/*c端 短信营销*/
import Smsc from './../container/Smsc'
import SmscAdd from './../container/SmscAdd'
import SmscReg from './../container/SmscReg'
import SmscHistory from './../container/SmscHistory'
import SmscModel from './../container/SmscModel'
/**/
/*b端 短信营销*/
import Smsb from './../container/Smsb'
import SmsbReg from './../container/SmsbReg'
import SmsbHistory from './../container/SmsbHistory'
import SmsbModel from './../container/SmsbModel'
/**/
import Create from './../container/Create'
import Manage from './../container/Manage'
import Imports from './../container/Imports'
import {requireCredentials} from './units'
const routes = {
    path: '/',
    component: Main,
    childRoutes: [
        {
            path: 'index',
            component: Index,
            onEnter: requireCredentials,
            childRoutes: [
                {
                    path: 'pullc',
                    component: OtherManage,
                    childRoutes: [{
                        path: 'create', /*新建项目*/
                        component: Create
                    }, {
                        path: 'smsc', /*短信营销*/
                        component: Smsc,
                        childRoutes: [{
                            path: 'reg',
                            component: SmscReg
                        },{
                            path: 'add',
                            component: SmscAdd
                        },{
                            path: 'history',
                            component: SmscHistory
                        },{
                            path: 'model',
                            component: SmscModel
                        }]
                    }]
                },
                {
                    path: 'pullb',
                    component: OtherManage,
                    childRoutes: [{
                        path: 'manage', /*职位管理*/
                        component: Manage
                    }, {
                        path: 'imports', /*导入职位*/
                        component: Imports
                    }, {
                        path: 'smsb', /*短信营销*/
                        component: Smsb,
                        childRoutes: [{
                            path: 'reg',
                            component: SmsbReg
                        },{
                            path: 'history',
                            component: SmsbHistory
                        },{
                            path: 'model',
                            component: SmsbModel
                        }]
                    }]

                }
            ]
        }, {
            path: 'login',
            component: Login
        }

    ]
}
export default routes