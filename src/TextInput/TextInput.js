import React, { Component } from 'react';
import './TextInput.css';

class TextInput extends Component {
    render(){
        return (
            <div className="TextInput">
                <label for={this.props.name}>{this.props.name}</label>
                <input 
                    name={this.props.name} 
                    type="text" 
                    value={this.props.value} 
                    onChange={this.props.onChange} />
            </div>
        );
    }
}
export default TextInput