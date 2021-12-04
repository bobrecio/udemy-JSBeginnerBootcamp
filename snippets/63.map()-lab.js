// lab 1
var nums = [1,2,3,4,5];

var newVals = nums.map(function(a){
    return a * 2;
}).map(function (a){
    return a + 1;
})

console.log(newVals);

// lab 2
var greetings = ['hi','hello','hey','thanks'];

var shout = greetings.map(function(greeting){
    return greeting.toUpperCase();
    });

var hiShout = shout.shift();