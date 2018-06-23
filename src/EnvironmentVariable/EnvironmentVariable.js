import React, { Component } from 'react';
import './EnvironmentVariable.css';

class EnvironmentVariable extends Component {
    render(){
        return (
            <div className="EnvironmentVariable">
                <input 
                    class="label"
                    name={this.props.name + "Name"} 
                    type="text" 
                    value={this.props.name} 
                    onChange={this.props.onNameChange} />
                <input 
                    name={this.props.name + "Value"} 
                    type="text" 
                    value={this.props.value} 
                    onChange={this.props.onValueChange} />
            </div>
        );
    }
}
export default EnvironmentVariable