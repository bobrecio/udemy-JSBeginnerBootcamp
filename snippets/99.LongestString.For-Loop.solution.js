// Supercalifragilisticexpialidocious

// Challenge
// Given a string of words return the length of the longest word(s)

// Examples
// 'Hi, where is the airport?' -> 7
// 'Thanks for stopping by!' -> 8

// Approach 1 - Using Built in Functions & Regular Expressions & For Loop

// Tools
// split() method - splits a string into an array
// http://bit.ly/string-split
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
    var longestWord = 0;
    // Step 3 -> Declare a variable `wordArray` and use split method to
    // create an array of words.
    var wordArray = stringWithoutSpecialCharacters.split(' ');
    // Step 4 -> Create a for loop to loop through `wordArray`
    for (var i = 0; i < wordArray.length; i++) {
        // Step 5 -> create a conditional to ask if the length of current
        // item in the array is `>` than `longestWord`
        if (wordArray[i].length > longestWord) {
            // Step 6 ->  In the code block set `longestWord` to the length of current
            // item in being looped over in the array
            longestWord = wordArray[i].length;
        }
    }
    // Step 7 -> return `longestWord`
    return longestWord;
    // }

    console.log(longestWordLength('Hi, where is the airport?'));
    console.log(longestWordLength('Thanks for stopping by!'));