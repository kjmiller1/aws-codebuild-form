import React, { Component } from 'react';
import './SubmitButton.css';

class SubmitButton extends Component {
    render(){
        return (
            <div onClick={this.props.onClick} className="SubmitButton">{this.props.title}</div>
        );
    }
}
export default SubmitButton