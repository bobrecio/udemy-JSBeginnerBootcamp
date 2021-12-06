// return the longest word in a given string of words
function longWord(str){
    var longestWord = '';
    
    // make the words array and make lowercase
    var arrWords = str.toLowerCase().split(' ');
                   //.forEach(word => {return word.replace(/[\W]/g,'')});
        
    // loop through and find the longest word
    for (var i=0; i < arrWords.length; i++){
        longestWord = (longestWord.length > arrWords[i].length) ? longestWord : arrWords[i];
    }
    return longestWord;
}