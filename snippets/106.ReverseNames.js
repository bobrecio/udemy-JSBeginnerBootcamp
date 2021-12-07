// Create a function that accepts a string (of a persons first and last name) and returns a string with the first and last name swapped.
  
  // Examples
  // "John Smith" ➞ "Smith John"
  // "Albert Einstein" ➞ "Einstein Albert"

function nameShuffle(str) {
  var result = str.split(' ').reverse().join(' ');
  return result;
}

console.log(nameShuffle("John Smith"));
console.log(nameShuffle("Albert Einstein"));