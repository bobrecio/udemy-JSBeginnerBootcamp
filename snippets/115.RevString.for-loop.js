// Reverse a String
 
// Challenge
  // Reverse the provided string.
  // You may need to turn the string into an array before you can reverse it.
  // Your result must be a string.
 
// Examples
  // 'car' -> 'rac'
  // 'bar' -> 'rab'
 
// Tools
  // for loops
    // http://bit.ly/for-loop-javascript
 
  function revString(str) {
 
  // step 1 -> create a `reverseString` variable with an empty placeholder string.
    // You will return `reverseString` after you have looped through it.
  var reverseString = '';
  // step 2 -> create a for loop starting with last character and ending with first character of the string
    // set
  for (var i = str.length - 1; i >= 0; i--) {
    // in the code block add the current letter being looped through to the reverseString variable
    reverseString += str[i];
  }
  // step 3 -> return `reverseString` variable
  return reverseString;
  }
 
  // tests
  console.log(revString('car'));
  console.log(revString('bar'));