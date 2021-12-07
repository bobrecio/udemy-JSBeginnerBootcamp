// Reverse a String
 
// Challenge
  // Reverse the provided string.
  // You may need to turn the string into an array before you can reverse it.
  // Your result must be a string.
 
// Examples
  // 'car' -> 'rac'
  // 'bar' -> 'rab'
 
// Tools
  // for of
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
 
  function revString(str) {
 
  // step 1 -> create a `reverseString` variable with an empty placeholder string.
    // You will return `reverseString` after you have looped through it.
  var reverseString = '';
  // step 2 -> create a for of loop starting with last character and ending with first character of the string
    // remember the syntax for (variable of iterable) { ... run code here }
  for (var letter of str) {
    // in the code block add the current letter being looped through to the front of the `reverseString` variable
    reverseString = letter + reverseString;
  }
  // step 3 -> return `reverseString` variable
  return reverseString;
  }
 
  // tests
  console.log(revString('car'));
  console.log(revString('bar'));