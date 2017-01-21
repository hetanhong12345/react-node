/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component ,PropTypes} from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Button,message} from 'antd'
import {LoginAction,GetStore} from './../actions/actions'
import {sysPost,sysGet} from './../webConfig/units'
import './../less/login.less'
const FormItem = Form.Item
class Login extends Component {
    constructor(props, context) {
        super(props, context)
        console.log('login')
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        let formError = false
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                formError = true
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
        if (formError) {
            return
        }
        let {name} =this.props.form.getFieldsValue();
        let {pass} =this.props.form.getFieldsValue();
        let {LoginAction} =this.props;
        sysPost('/login', {name, pass}).then(function (data) {
            console.log(data)
            if (!data||data.status==404) {
                message.error('系统错误，登录失败 ')
                return
            }
            if (data.code == '10008') {
                message.error(data.message)
                return
            }
            if (data.username) {
                LoginAction({
                    employeeName: data.employeeName||data.username,
                    loginStatus: true
                })
                browserHistory.push('/index/pullc/smsc')
            }
        })
    }

    getJob() {
        sysGet('/job/174855').then(function (data) {
            console.log(data)
        })
    }

    getJobList() {
        sysGet('/jobList', {count: 15, start: 1}).then(function (data) {
            console.log(data)
        })
    }

    getExcel() {
        window.open('/public/b.xlsx', '_self');
    }

    render() {
        const { getFieldProps } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                {required: true, message: '用户名不能为空'}

            ],
        });
        const passProps = getFieldProps('pass', {
            rules: [
                {required: true, message: '密码不能为空'}

            ],
        });
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return (
            <div className='login'>
                <Form horizontal onSubmit={(e)=>this.handleSubmit(e)}>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                        hasFeedback
                        >
                        <Input type="text" {...nameProps} placeholder="请输入用户名" name="name"/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                        >
                        <Input type="password" {...passProps} placeholder="请输入密码" name="pass"/>
                    </FormItem>

                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>

            </div>
        )
    }
}
Login.propTypes = {
    LoginAction:PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators({LoginAction, GetStore}, dispatch)
}
export default   connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))