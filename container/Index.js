/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames/bind'
import Header from './../components/Header'
import {LoginAction} from './../actions/actions'
import {sysGet} from './../webConfig/units'
import OtherManage from './OtherManage'
import {Icon} from 'antd'
import './../less/index.less'
class Index extends Component {
    
    constructor(props, context) {
        super(props, context)
        console.log('index')
        this.state={
            current:1,
        }


    }
    componentDidMount() {
        let {LoginAction,location} = this.props
        sysGet('/ssl/user').then(function (data) {
            console.log(data)
            if(data.msg!=1){
                return false;
            }
            let body = data.body
            LoginAction({
                employeeName:body.employeeName||body.username,
                loginStatus:true
            })
        })
        if(location.pathname=='/index'){
            this.context.router.replace('/index/pullc')
        }

        if(location.pathname.indexOf('manage')>-1){
          this.setState({current:2})
        }
        if(location.pathname.indexOf('imports')>-1){
            this.setState({current:11})
        }
        if(location.pathname.indexOf('smsb')>-1){
            this.setState({current:12})
        }

    }

    componentWillReceiveProps(props) {
        console.log(props)
    }
    handleClick(key){
        let {current} =this.state
        if(current == key){
            return false;
        }
        this.setState({current:key})
        let {router} = this.context
        switch (key){
            case 1:
               router.push('/index/pullc/smsc')
                break
            case 2:
               router.push('/index/pullb/manage')
                break
            case 11:
               router.push('/index/pullb/imports')
                break
            case 12:
               router.push('/index/pullb/smsb')
                break
            default :

        }
    }
    render(){
        const { user} = this.props
        return(
            <div>
                <Header name={user.employeeName}></Header>
                <div className="main-warp">
                        <div className='main-left'>
                            <div className='main-title'>
                                C端产品
                            </div>
                            <div className={classNames('sub-title',{'active':this.state.current==1})}  onClick={()=>this.handleClick(1)}>
                                <Icon type="mail" /> 短信营销
                            </div>
                            <div  className={classNames('sub-title',{'active':this.state.current==2})} onClick={()=>this.handleClick(2)}>
                                <Icon type="file" /> EDM营销
                            </div>
                            <div className='sub-title'>
                                <Icon type="bars" /> 匹配营销
                            </div>
                            <div className='sub-title'>
                                <Icon type="bar-chart" /> 数据统计
                            </div>
                            <div className='main-title'>
                                B端产品
                            </div>
                            <div  className={classNames('sub-title',{'active':this.state.current==11})}  onClick={()=>this.handleClick(11)}>
                                <Icon type="upload" /> 获取资源
                            </div>
                            <div  className={classNames('sub-title',{'active':this.state.current==12})}  onClick={()=>this.handleClick(12)}>
                                <Icon type="mail" /> 短信营销
                            </div>
                            <div className='sub-title'>
                                <Icon type="file" /> EDM营销
                            </div>

                        </div>
                        <div className='main-right' span={20}>
                            <div>{this.props.children||<OtherManage/>}</div>
                        </div>

                </div>

            </div>
        )
    }
}
Index.propTypes = {
    user: PropTypes.object.isRequired,
    LoginAction:PropTypes.func.isRequired,
    history:PropTypes.object.isRequired,
    location:PropTypes.object.isRequired,
    children:PropTypes.element
}
 Index.contextTypes = {
        router: PropTypes.object.isRequired
    }
function mapStateToProps(state) {
    return {
        user:state.user
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators({LoginAction}, dispatch)
}
 export default   connect(mapStateToProps,mapDispatchToProps)(Index)