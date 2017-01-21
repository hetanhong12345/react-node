/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component, PropTypes } from 'react'
class Main extends Component {
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
Main.propTypes = {
    children:PropTypes.element
}
export default Main