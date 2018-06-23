import { CodeBuild, AWSError } from 'aws-sdk';

function getParams(projectName, sourceVersion){
    return {
        projectName: projectName,
        sourceVersion: sourceVersion
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
    sourceVersion){
    var codeBuild = new CodeBuild({
        apiVersion: '2016-10-06',
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        sessionToken: sessionToken,
        region: region
    });
    codeBuild.startBuild(
        getParams(projectName, sourceVersion),
        (err, data) => {
            if (err){ onError(err); }
            else{ onSuccess(data); }
        }
    );
}