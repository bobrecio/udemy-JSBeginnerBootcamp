function onlyEvens (arrNums){
    var arrEvensOnly = [];
    for (var i = 0; i < arrNums.length; i++){
        if (arrNums[i] % 2 == 0){
            arrEvensOnly.push(arrNums[i]);
        }
    }
    return arrEvensOnly;
}