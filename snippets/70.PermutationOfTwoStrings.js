// Find if two strings are permutations of eachother
// string.split()
// array.sort()
// array.join()

function isPermutation(word1, word2){
    // split(): create an array or each of the words
    // sort(): put all the letters in alpha order
    // join(): combine the letters to use it as a string 
    var str1 = word1.toLowerCase().split('').sort().join();
    var str2 = word2.toLowerCase().split('').sort().join();
    
    // are the strings the same 
    var sameLetters = (str1 == str2);

    console.log(str1, str2);
    
    return sameLetters;
}