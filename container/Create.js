/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item
class Create extends Component {
    constructor(props, context) {
        super(props, context)
    }
    nameExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === '12345') {
                    callback([new Error('抱歉，该项目名已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });

    }
    render(){
        const { getFieldProps } = this.props.form;
        const {user} =this.props
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        /*项目名称*/
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, min: 5, message: '项目名至少为 5 个字符' },
                { validator: this.nameExists },
            ],
        });
        /*备注*/
        const textareaProps = getFieldProps('marks', {
            rules: [
                { required: true, message: '真的不打算写点什么吗？' },
            ],
        });
        return(
            <div>
                <p className="title">
                    C端项目管理 -- 新建项目
                </p>

                <Form horizontal onSubmit={(e)=>this.handleSubmit(e)} style={{marginTop:'20px'}} >
                    <FormItem
                        {...formItemLayout}
                        label="项目名称"
                        hasFeedback
                        >
                        <Input type="text" {...nameProps} name="name"  placeholder="请输入项目名称" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                        hasFeedback
                        >
                        <Input {...textareaProps} type="textarea" placeholder="填写备注" name="marks" rows="3"/>
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="创建时间"
                    >
                    <Input type="text" {...getFieldProps('createTime', { initialValue: '1234567' })} disabled />
                </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="创建人"
                        >
                        <Input type="text" {...getFieldProps('by', { initialValue: user.employeeName })} disabled />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
Create.propTypes = {
    form: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}
function mapStateToProps(state) {
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Form.create()(Create))