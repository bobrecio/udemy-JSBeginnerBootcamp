// return the longest word in a given string of words
function longWord(str){
    var longestWord = '';
    //var strAlphaOnly = str.replace(/\W/g,' ');
    var arrWords = str.toLowerCase().replace(/\W/g,' ').split(' ');

    for (let word of arrWords){
        longestWord = (longestWord.length > word.length) ? longestWord : word;
    }
    
    return longestWord;
}