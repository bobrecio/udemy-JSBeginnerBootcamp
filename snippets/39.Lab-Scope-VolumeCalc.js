// volume = length * width * height

'use strict'

var height = 20;

function volume() {
    var width = 10;
    var length = 10;
    var volumneOfObject = function(){
        return length * width * height;
    }
    return volumneOfObject();
}

console.log("The volume is " + volume());
