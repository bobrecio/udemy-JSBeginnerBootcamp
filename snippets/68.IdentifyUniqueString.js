// identify if a sring has all unique letters

function uniqueString(strToCheck){
    for (i=0; i < strToCheck.length; i++){
        if (strToCheck.indexOf(strToCheck[i]) != strToCheck.lastIndexOf(strToCheck[i])){
            return false;
        }
    }
    return true;
}