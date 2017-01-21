/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component, PropTypes } from 'react'
import { Button, Row,Col} from 'antd'
import SmscReg from './SmscReg'
import classNames from 'classnames/bind'
class Smsc extends Component {
    
    constructor(props, context) {
        super(props, context)
        this.state={
            current:1,
            titleText:'短信注册'
        }
    }
    componentDidMount(){
        let {location} = this.props
        if(location.pathname.indexOf('add')>-1){
            this.setState({current:2,titleText:'短信添粉'})
        }
        if(location.pathname.indexOf('history')>-1){
            this.setState({current:3,titleText:'查询历史'})
        }
        if(location.pathname.indexOf('model')>-1){
            this.setState({current:4,titleText:'模板管理'})
        }
    }
    setCurrent(index){
        let {current} =this.state
        let textArray =['','短信注册','短信添粉','查询历史','模板管理']
        let titleText =textArray[index]
        if(index ==current){
            return
        }
       let {router} = this.context
        this.setState({
            current:index,
            titleText
        })
        switch (index){
            case 1:
                router.push('/index/pullc/smsc/reg')
                break
            case 2:
                router.push('/index/pullc/smsc/add')
                break
            case 3:
                router.push('/index/pullc/smsc/history')
                break
            case 4:
                router.push('/index/pullc/smsc/model')
                break
            default :
                return
        }
    }
    render(){
        return(
            <div>
                <Row>
                    <Col className="title" span ={12}>
                        短信营销-{this.state.titleText}
                    </Col>
                    <Col className="title" span ={12} style={{textAlign:'right'}}>
                        <Button type="ghost" className={classNames({'active':this.state.current==1})} style={{marginLeft:'10'}} onClick={()=>this.setCurrent(1)}>短信注册</Button>
                        <Button type="ghost" className={classNames({'active':this.state.current==2})} style={{marginLeft:'10'}} onClick={()=>this.setCurrent(2)}>短信添粉</Button>
                        <Button type="ghost" className={classNames({'active':this.state.current==3})} style={{marginLeft:'10'}} onClick={()=>this.setCurrent(3)}>查询历史</Button>
                        <Button type="ghost" className={classNames({'active':this.state.current==4})} style={{marginLeft:'10'}} onClick={()=>this.setCurrent(4)}>模板管理</Button>
                    </Col>
                </Row>
                <div>{this.props.children||<SmscReg/>}</div>
            </div>
        )
    }
}

Smsc.contextTypes = {
        router: PropTypes.object.isRequired
    }
Smsc.propTypes = {
    history:PropTypes.object.isRequired,
    location:PropTypes.object.isRequired,
    children:PropTypes.element
}
export default Smsc