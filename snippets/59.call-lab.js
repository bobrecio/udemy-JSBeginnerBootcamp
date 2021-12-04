// call() lab

var user1 = {name: "Bob"};
var user2 = {name: "Bev"};

 var myLanguages = function(lang1, lang2, lang3){
    console.log('My name is ' + this.name + ' and i know ' + lang1 + ', ' + lang2 + ' and ' + lang3)  
 };

 myLanguages.call(user2,"js","vb","python"); 