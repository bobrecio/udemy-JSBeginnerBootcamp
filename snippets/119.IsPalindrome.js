// Determine if a string is a Palindrome
 
// Challenge
  // A palindrome is a text that is spelled the same front to back.
 
// Examples
  // 'Eva, Can I Stab Bats In A Cave?' -> true
  // 'Was It A Rat I Saw?' -> true
  // 'A nut for a jar of tuna?' -> true
 
// Note
  // Ignore capitalization and spaces or any special characters.
 
// Tools
  // String.prototype.replace()
    // http://bit.ly/string-replace-method
  // Online Regex Tool
    // http://bit.ly/regular-expressions-javascript
    // https://regex101.com/
  // String.prototype.toLowerCase()
    // http://bit.ly/lowercase-string
 
function isPalindrome(str) {
  // Step 1 -> Use regular expressions to remove all non-word characters
  // e.g. "," with replace function
  var stringWithoutSpecialCharacters = str.replace(/\W/g, '');
 
  // Step 2 -> Turn the string into lower case assuming that our palindrome is
  // case insensitive
  var caseInsensitiveString = stringWithoutSpecialCharacters.toLowerCase();
 
  // Step 3 -> Reverse string with built in functions/for loop/for of loop and assign
  // to new variable `reverseString`
  
  //   Built In Functions
  //   var reverseString = caseInsensitiveString.split('').reverse().join('');
 
  //   For Loop
  //   var reverseString = '';
  //   for (var i = caseInsensitiveString.length - 1; i >= 0; i--) {
  //     reverseString += caseInsensitiveString[i];
  //   }
 
  //   For Of Loop 
  //   reverseString = '';
  //   for (var letter of caseInsensitiveString) {
  //     reverseString = letter + reverseString;
  //   }
 
  // Step 4 -> Return boolean as to whether our original string without special
  // characters and case insensitive is equal to our reversed string
  return caseInsensitiveString === reverseString;
}
 
console.log(isPalindrome('Eva, Can I Stab Bats In A Cave?'));
console.log(isPalindrome('Was It A Rat I Saw?'));
console.log(isPalindrome('A nut for a jar of tuna?'));