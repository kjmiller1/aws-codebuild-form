import React, { Component } from 'react';
import SubmitButton from '../SubmitButton/SubmitButton.js';
import TextInput from '../TextInput/TextInput.js';
import EnvironmentVariable from '../EnvironmentVariable/EnvironmentVariable.js';
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
            sourceVersion : getSourceVersion(window.location.href),
            environmentVariablesOverride: JSON.parse(getParameterByName("environmentVariablesOverride", window.location.href) || "[]"),
        };
    }
    onAccessKeyChange(value){
        
        const splitValue = value.split(" ");
        if(splitValue.length !== 1){
            let newState = {};
            splitValue.forEach(element => {
                const splitElement = element.split("=",2);
                if(splitElement.length > 1){
                    switch (splitElement[0]) {
                        case "AWS_ACCESS_KEY_ID":
                            newState.accessKeyId = splitElement[1];    
                            break;
                        case "AWS_SECRET_ACCESS_KEY":
                            newState.secretAccessKey = splitElement[1];    
                            break;
                        case "AWS_SESSION_TOKEN":
                            newState.sessionToken = splitElement[1];    
                            break;
                        case "AWS_DEFAULT_REGION":
                            newState.region = splitElement[1];    
                            break;
                        default:
                            break;
                    }
                }
            });
            this.setState(newState);
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
            this.state.sourceVersion,
            this.state.environmentVariablesOverride);
    }
    getLinkFromState(){
        let link = window.location.href.split("?")[0] + "?";
        link += this.convertParameterToQueryString("region",this.state.region);
        link += this.convertParameterToQueryString("projectName",this.state.projectName);
        link += this.convertParameterToQueryString("sourceVersion", this.state.sourceVersion);
        let environmentVariablesOverrideCopy = this.state.environmentVariablesOverride.filter((value,index) => value.hasOwnProperty("name") && value.name !== null  && value.name.length > 0);
        link += this.convertParameterToQueryString("environmentVariablesOverride", JSON.stringify(environmentVariablesOverrideCopy));
        return link;
    }
    convertParameterToQueryString(parameterName, parameterValue){
        if(parameterValue !== null && parameterValue !== undefined && parameterValue.length > 0){
            return parameterName + "=" + encodeURIComponent(parameterValue) + "&";
        }else{
            return "";
        }
    }
    render(){
        let addEnvironmentVariableOverrideButton = "";
        if(!this.state.environmentVariablesOverride.some((element) => element.name === "")){
            addEnvironmentVariableOverrideButton = <a onClick={() => {
                let stateChange = this.state.environmentVariablesOverride;
                stateChange.push({name:"",value:""});
                this.setState({ environmentVariablesOverride: stateChange});
            }}>Add Environment Variable</a>;
        }
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
                </fieldset>
                <fieldset>
                    <legend>Basic Code Build Parameters:</legend>
                    <TextInput 
                        name="region" 
                        value={this.state.region} 
                        onChange={(event) => this.setState({region: event.target.value})} />
                    <TextInput 
                        name="projectName" 
                        value={this.state.projectName} 
                        onChange={(event) => this.setState({projectName: event.target.value})} />
                    <TextInput 
                        name="sourceVersion" 
                        value={this.state.sourceVersion} 
                        onChange={(event) => this.setState({sourceVersion: event.target.value})} />
                </fieldset>
                <fieldset>
                    <legend>Environment Variables Override:</legend>
                    {this.state.environmentVariablesOverride.map((value, index) => 
                        <EnvironmentVariable 
                            name={value.name} 
                            value={value.value} 
                            onNameChange={(event) => {
                                let stateChange = this.state.environmentVariablesOverride;
                                stateChange[index].name = event.target.value;
                                this.setState({ environmentVariablesOverride: stateChange});
                            }}
                            onValueChange={(event) => {
                                let stateChange = this.state.environmentVariablesOverride;
                                stateChange[index].value = event.target.value;
                                this.setState({ environmentVariablesOverride: stateChange});
                            }} />
                        )}
                    {addEnvironmentVariableOverrideButton}
                </fieldset>
                <SubmitButton title="Start Build" onClick={() => this.startBuild()} />
                <div><a href={this.getLinkFromState()}>{this.getLinkFromState()}</a></div>
                <span style={{ color: "#C0C0C0" }} >
                    document.referrer to parse: <br/>
                    {"\"" + document.referrer + "\""}
                </span>
            </form>
        );
    }
}
export default Form