// Alphabetical Order

// Challenge
// Create a function that takes a string and returns a string with its letters
// in alphabetical order.

// Examples
// "hello" ➞ "ehllo"
// "goodbye" ➞ "bdegooy"

// Approach 1 - // if statement / for loop

// Tools
// Spread Operator
// https://codeburst.io/javascript-the-spread-operator-a867a71668ca
// Array.prototype.sort()
// http://bit.ly/array-sort
// Array.prototype.join()
// http://bit.ly/array-join

function alphaOrder(str) {

    // step 1 -> split the string into an array with spread operator
    var strToArr = [...str];

    // step 2 -> sort the letters in the array
    var revArr = strToArr.sort();

    // step 3 -> join the array back into a string
    var sortedStr = revArr.join('');

    // step 4 -> return the alphabetized array
    return sortedStr;

    // all in one step
    return [...str].sort().join('');

}

console.log(alphaOrder("hello"));
console.log(alphaOrder("goodbye"));