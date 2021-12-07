// Reverse a String
 
// Challenge
  // Reverse the provided string.
  // You may need to turn the string into an array before you can reverse it.
  // Your result must be a string.
 
// Examples
  // 'car' -> 'rac'
  // 'bar' -> 'rab'
 
// Tools
  // spread operator
    // http://bit.ly/spread-operator
 
function revString(str) {
 
// step 1 -> create a `reverseString` variable with an empty placeholder string.
  // You will return `reverseString` after you have looped through it.
return  [...str].reverse().join('');
}
 
// tests
console.log(revString('car'));
console.log(revString('bar'));