var randomBodyParts = ['nose','face','butt','body'];
var randomAdjectives = ['smelly','fat','loud','stupid'];
var randomWords = ['rat','fart','cheese','poop'];

var randomBodyPart = randomBodyParts[Math.floor(Math.random()*4)];
var randomAdjective = randomAdjectives[Math.floor(Math.random()*4)];
var randomWord = randomWords[Math.floor(Math.random()*4)];

var insult = "Your " + randomBodyPart +
                " is like a " + randomAdjective +
                " " + randomWord;

console.log(insult);
