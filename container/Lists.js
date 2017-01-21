/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component, PropTypes } from 'react'
import {Table, Button, Row,Col} from 'antd'
import {sysGet} from './../webConfig/units'
class Lists extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount(){
        sysGet('/ssl/pullc/lists').then(function(data){
            console.log(data);
        })
    }
    createNew(){
        let {history} = this.props
        history.push('/index/pullc/create')
    }
    render(){
        return(
            <div>
                <Row>
                    <Col className="title" span ={12}>
                        短信营销-短信注册
                    </Col>
                    <Col className="title" span ={12} style={{textAlign:'right'}}>
                        <Button type="ghost" style={{marginLeft:'10'}} onClick={()=>this.createNew()}>短信注册</Button>
                        <Button type="ghost" style={{marginLeft:'10'}} onClick={()=>this.createNew()}>短信天粉</Button>
                        <Button type="ghost" style={{marginLeft:'10'}} onClick={()=>this.createNew()}>查询历史</Button>
                        <Button type="ghost" style={{marginLeft:'10'}} onClick={()=>this.createNew()}>模板管理</Button>
                    </Col>
                </Row>
                <div>{this.props.children}</div>
            </div>
        )
    }
}
export default Lists