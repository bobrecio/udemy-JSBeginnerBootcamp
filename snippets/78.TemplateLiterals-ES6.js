var favs = {
    name: "Bob",
    fav1: "Seafood",
    fav2: "Fishing",
    myFavs1: function(){
        console.log("1) My name is " + this.name + ".\nI like " + this.fav1 + " and " + this.fav2 + ".");
    },
    myFavs2: function(){
        console.log(`2) My name is ${this.name}.
I like ${this.fav1} and ${this.fav2}.` );
    }
}

favs.myFavs1();
favs.myFavs2();

var drink = 'coffee';
var food = 'doughnut';
var time = 'morning';

console.log('ES5) This ' + time + ', John said, \"I\'m going to have ' + drink + ' and a ' + food + '.');
console.log(`ES6) This ${time}, John said, "I'm going to have ${drink} and a ${food}."`);