/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Button ,Col,Row} from 'antd';
import {sysPost} from './../webConfig/units'
class Header extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handClick() {
        sysPost('/logout').then(function (data) {
            if (data.msg == 1) {
                browserHistory.push('/login')
            }
        })

    }

    render() {
        const {name} =this.props
        return (
            <div className='header clearfix'>
                <Row>
                    <Col span={12} style={{textAlign:'left'}}>
                        <img src='/public/img/logo.png' style={{height:'60px',verticalAlign:'middle'}}/>
                            <span style={{fontSize:'16px',paddingLeft:'5px'}}>拉新引擎管理系统</span>
                    </Col>
                    <Col span={12}>
                        <span className='user-name'>{name}</span>
                        <Button type="primary" onClick={()=>this.handClick()}>退出</Button>
                    </Col>
                </Row>

            </div>
        )
    }
}
Header.propTypes = {
    name: PropTypes.string.isRequired
}
export default Header