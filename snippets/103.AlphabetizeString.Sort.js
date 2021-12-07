// Alphabetical Order

// Challenge
// Create a function that takes a string and returns a string with its letters
// in alphabetical order.

// Examples
// "hello" ➞ "olleh"
// "goobye" ➞ "eyboog"
// "now" ➞ "won"
// "javascript" ➞ "aacijprstv"

// Approach 1 - // if statement / for loop

// Tools
// String.prototype.split()
// http://bit.ly/string-split
// Array.prototype.sort()
// http://bit.ly/array-sort
// Array.prototype.join()
// http://bit.ly/array-join

function alphaOrder(str) {

    // step 1 -> split the string into an array
    var strToArr = str.split('');

    // step 2 -> sort the letters in the array
    var revArr = strToArr.sort();

    // step 3 -> join the array back into a string
    var sortedStr = revArr.join('');

    // step 4 -> return the alphabetized array
    return sortedStr;

    // all in one step
    return str.split('').sort().join('');

}

console.log(alphaOrder("hello"));
console.log(alphaOrder("goodbye"));