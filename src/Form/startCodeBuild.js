import { CodeBuild, AWSError } from 'aws-sdk';

function getParams(projectName, sourceVersion, environmentVariablesOverride){
    return {
        projectName: projectName,
        sourceVersion: sourceVersion,
        environmentVariablesOverride: environmentVariablesOverride
    };
}

export default function startCodeBuild(
    onError, 
    onSuccess, 
    accessKeyId,
    secretAccessKey,
    sessionToken,
    region,
    projectName, 
    sourceVersion,
    environmentVariables){
    const environmentVariablesOverride = 
        Object.keys(environmentVariables).map(function(key) {
        return {name: key, value: environmentVariables[key]};
        });
    var codeBuild = new CodeBuild({
        apiVersion: '2016-10-06',
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        sessionToken: sessionToken,
        region: region
    });
    codeBuild.startBuild(
        getParams(projectName, sourceVersion, environmentVariablesOverride),
        (err, data) => {
            if (err){ onError(err); }
            else{ onSuccess(data); }
        }
    );
}