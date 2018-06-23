
function getSourceVersionFromQueryString(){
    const url = window.location.href;
    let name = "sourceVersion";
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function getSourceVersionFromReferrer(){
    // parse document.referrer
}

export default function getSourceVersion(){
    let toReturn = getSourceVersionFromQueryString();
    if(toReturn != null && toReturn.length > 0){
        return toReturn;
    }else{
        return getSourceVersionFromReferrer();
    }
}