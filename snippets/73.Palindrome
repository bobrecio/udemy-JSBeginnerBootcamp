// find if string is a palindrome
// regular expressions
// '/abc/ig'
// abc = pattern to find
// i = case-insensitive
// g = global (match all occurences)
// [^A-Za-z0-9] = not any of these (^=not)
// ... \W is equivelent (non-Word char)

// string.replace(regexp | substr, newSubStr | function)

function isPalindrome(word){
    var wordChars = word.toLowerCase().replace(/ /g,'').replace(/\W_/g,'').split(''); // global replace non-Word chars and '_'

    for (var i=0; i < wordChars.length; i++) {
        
        var letter1 = wordChars[i];
        var letter2 = wordChars[wordChars.length - i - 1];

        console.log(letter1 + " = " + letter2 + " : " + (letter1==letter2));

        if (letter1 != letter2 ){
            return false;
        }
    }
    return true;
}