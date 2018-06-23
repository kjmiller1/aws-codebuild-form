import React, { Component } from 'react';
import SubmitButton from '../SubmitButton/SubmitButton.js';
import TextInput from '../TextInput/TextInput.js';
import getSourceVersion from './getSourceVersion.js';
import getParameterByName from './getParameterByName.js';
import startCodeBuild from './startCodeBuild.js';
import './Form.css';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            region: getParameterByName("region", window.location.href),
            projectName: getParameterByName("projectName", window.location.href),
            sourceVersion : getSourceVersion(window.location.href)
        };
    }
    onAccessKeyChange(value){
        
        const splitValue = value.split(" ");
        if(splitValue.length === 8){
            // alert("new accessKeyId:" + splitValue[1].split("=")[1]);
            // alert("new secretAccessKey:" + splitValue[4].split("=")[1]);
            this.setState({
                accessKeyId: splitValue[1].split("=")[1],
                secretAccessKey: splitValue[4].split("=")[1],
                sessionToken: splitValue[7].split("=", 2)[1]
            });
        }else{
            this.setState({
                accessKeyId: value
            });
        }
    }
    startBuild(){
        startCodeBuild(
            (err) => alert(JSON.stringify(err)),
            (data) => alert(JSON.stringify(data)),
            this.state.accessKeyId,
            this.state.secretAccessKey,
            this.state.sessionToken,
            this.state.region,
            this.state.projectName,
            this.state.sourceVersion);
    }
    render(){
        return (
            <form className="Form" onSubmit={ () => false }>
                <fieldset>
                    <legend>AWS Account Information:</legend>
                    <TextInput 
                        name="accessKeyId" 
                        value={this.state.accessKeyId} 
                        onChange={(event) => this.onAccessKeyChange(event.target.value)} />
                    <TextInput 
                        name="secretAccessKey" 
                        value={this.state.secretAccessKey} 
                        onChange={(event) => this.setState({secretAccessKey: event.target.value})} />
                    <TextInput 
                        name="sessionToken" 
                        value={this.state.sessionToken} 
                        onChange={(event) => this.setState({sessionToken: event.target.value})} />
                    <TextInput 
                        name="region" 
                        value={this.state.region} 
                        onChange={(event) => this.setState({region: event.target.value})} />
                </fieldset>
                <fieldset>
                    <legend>Basic Code Build Parameters:</legend>
                    <TextInput 
                        name="projectName" 
                        value={this.state.projectName} 
                        onChange={(event) => this.setState({projectName: event.target.value})} />
                    <TextInput 
                        name="sourceVersion" 
                        value={this.state.sourceVersion} 
                        onChange={(event) => this.setState({sourceVersion: event.target.value})} />
                </fieldset>
                <SubmitButton title="Start Build" onClick={() => this.startBuild()} />
                <span style={{ color: "#C0C0C0" }} >
                    document.referrer to parse: <br/>
                    {"\"" + document.referrer + "\""}
                </span>
            </form>
        );
    }
}
export default Form