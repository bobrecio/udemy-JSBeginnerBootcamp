// this and call() examples

// example 1
var obj = {num:2};
var addToThis = function(a,b,c){
    return this.num + a + b + c;
}
addToThis.call(obj,3,4,5); // =14

// example 2
let person1 = {
    firstName:'Bob', 
    lastName:'Recio'
};
let person2 = {
    firstName:'Bev', 
    lastName:'Recio'
};
function hello(greeting){
    console.log(greeting + ', ' + this.firstName + ' ' + this.lastName + "!");
}

hello.call(person1, "Hi");
hello.call(person2, "Hola");