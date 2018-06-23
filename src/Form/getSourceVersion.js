import getParameterByName from './getParameterByName.js';
function getSourceVersionFromReferrer(){
    // parse document.referrer
}

export default function getSourceVersion(url){
    let toReturn = getParameterByName("sourceVersion", url);
    if(toReturn != null && toReturn.length > 0){
        return toReturn;
    }else{
        return getSourceVersionFromReferrer();
    }
}