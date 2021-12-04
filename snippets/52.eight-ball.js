var userName = prompt('What is your name?');

if (userName) {
  console.log('Hello, ' + userName + '.');
} else {
 console.log('Hello!');
} 

var userQuestion = prompt('Please ask a question!');

console.log('User question: ' + userQuestion);

var randomNumber = Math.floor(Math.random() * 8);

var eightBall = '';

switch (randomNumber){
  case 0:
    eightBall = 'Better not tell you now.';
    break;
  case 1:
    eightBall = 'Concentrate and ask again.';
    break;
  case 2:
    eightBall = 'Reply hazy try again';
    break;
  case 3:
    eightBall = 'Cannot predict now';
    break;
  case 4:
    eightBall = 'Dont count on it';
    break;
  case 5:
    eightBall = 'My reply is no.';
    break;
  case 6:
    eightBall = 'Outlook not so good';
    break;
  case 7:
    eightBall = 'Signs point to yes';
    break;
}

console.log('The eight ball answer: ' + eightBall);

// using if-else
/*
    if (randomNumber === 0) {
        return 'Better not tell you now.';
    } else if (randomNumber === 1) {
        return 'Concentrate and ask again.';
    } else if (randomNumber === 2) {
        return 'Reply hazy try again';
    } else if (randomNumber === 3) {
        return 'Cannot predict now';
    } else if (randomNumber === 4) {
        return 'Dont count on it';
    } else if (randomNumber === 5) {
        return 'My reply is no.';
    } else if (randomNumber === 6) {
        return 'Outlook not so good';
    } else if (randomNumber === 7) {
        return 'Reply hazy try again';
    } else {
        return 'Signs point to yes';
    } 
*/