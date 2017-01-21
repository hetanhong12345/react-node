/**
 * Created by Administrator on 2016/9/7.
 */
/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component, PropTypes } from 'react'
class ProjectManage extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render(){
        return(
            <div>
                <div>{this.props.children}</div>
            </div>
        )
    }
}
ProjectManage.propTypes = {
    children:PropTypes.element
}
export default ProjectManage