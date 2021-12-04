var nums = [1,2,3];
var chars = ['a','b','c'];

var es5cat = nums.concat(chars);
var es6cat = [...nums,...chars];

///
// function that takes 3 parameters
//   returns a string template with all parameters
var volume = (a,b,c) => `${a} * ${b} * ${c} = ${a*b*c}`; // '1 * 2 * 3 = 6'