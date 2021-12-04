// this and bind examples

// example 1

let person1 = {
    name: "Bob"
};
let person2 = {
    name: "Bev"
};
function namer() {
    console.log(this.name);
}
namer.bind(person1)();
namer.bind(person2)(); 

// example 2

let number = {
    x: 24,
    y: 22
};
let count = function() {
    console.log(this.x + this.y);   
}

let boundFunc = count.bind(number);

boundFunc();
