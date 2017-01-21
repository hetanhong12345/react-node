/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component, PropTypes } from 'react'
import Smsc from './Smsc'
class OtherManage extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render(){
        return(
            <div>
                <div>{this.props.children||<Smsc/>}</div>
            </div>
        )
    }
}
OtherManage.propTypes = {
    children:PropTypes.element
}
export default OtherManage