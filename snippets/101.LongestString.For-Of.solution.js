// Supercalifragilisticexpialidocious

// Challenge
// Given a string of words return the length of the longest word(s)

// Examples
// 'Hi, where is the airport?' -> 7
// 'Thanks for stopping by!' -> 8

// Approach 1 - Using Built in Functions & Regular Expressions

// Tools
// split() method - splits a string into an array
// http://bit.ly/string-split
// for of loop
// http://bit.ly/for-of-loop
// String.prototype.replace()
// http://bit.ly/string-replace-method
// Online Regex Tool
// http://bit.ly/regular-expressions-javascript
// https://regex101.com/
// https://regex101.com/r/c19vza/1

function longestWordLength(str) {
    // Step 1 -> Use regular expressions to remove all non-word characters e.g. "," with replace function
    var stringWithoutSpecialCharacters = str.replace(/\W/g, ' ');
    // Step 2 -> Declare a variable `longestWord` and set it equal to `0`
    var longestWord = '';
    // Step 3 -> Declare a variable `wordArray` and use split method to
    // create an array of words.
    var wordArray = stringWithoutSpecialCharacters.split(' ');
    // Step 4 -> Use for of loop to iterate through `wordArray`
    for (var count of wordArray) {
        // Step 5 -> Conditional `if` statement asking if current item in array
        // is longer then `longestWord.length`
        if (count.length > longestWord.length) {
            // In the code block set `longestWord` to the word in the array
            longestWord = count
        }
    }
    // Step 7 -> return the length of `longestWord`
    return longestWord.length;
}

console.log(longestWordLength('Hi, where is the airport?'));
console.log(longestWordLength('Thanks for stopping by!'));