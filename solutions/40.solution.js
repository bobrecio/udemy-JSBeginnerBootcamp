// create function getUserChoice with a parameter of `userInput`
function getUserChoice(userInput) {
    // turn future `userInput` to lower case
    userInput = userInput.toLowerCase();
    // if there is a match return `userInput`
    if (userInput === 'bear' || userInput === 'human' || userInput === 'gun') {
        return userInput;
      // if no match prompt user for valid entry
    } else {
        return 'Please enter valid option';
    }
}

// create a function that will provide a random computer choice for each round
function getComputerChoice() {
    var randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return 'bear';
    } else if (randomNumber === 1) {
        return 'human';
    } else {
        return 'gun';
    }
}
// create a function `determineWinner` and pass in parameters
// `userChoice` and `computerChoice`
function determineWinner(userChoice, computerChoice) {
    // if there is a tie
    if (userChoice === computerChoice) {
        return 'It is a tie';
    }
    // if user selects `'human'`
    if (userChoice === 'human') {
        // if computer selects `'bear'`
        if (computerChoice === 'bear') {
            return 'You have been mauled by a bear';
        } else {
            return 'You have disarmed a gun';
        }
    }
    // if user selects `'bear'`
    if (userChoice === 'bear') {
        // if computer selects `'gun'`
        if (computerChoice === 'gun') {
            return 'You have been shot by a gun';
        } else {
            return 'You have mauled a human';
        }
    }
    // if user selects `'gun'`
    if (userChoice === 'gun') {
        // if computer selectsion `'human'`
        if (computerChoice === 'human') {
            return 'Your gun has been disarmed';
        } else {
            return 'You have shot a bear';
        }
    }
}


function playGame() {
    // prompt user to make choice
    var promptUsesChoice = prompt("Please choose bear, human or gun");
    // format user choice to lower case and check for valid word
    var userChoice = getUserChoice(promptUsesChoice);
    // call `getComputerChoice()` and assign to variable `computerChoice` 
    var computerChoice = getComputerChoice();
    console.log(computerChoice);
    console.log(userChoice);
    // pass `userChoice` and `computerChoice` to the function `determineWinner`
    // and log to the console
    console.log(determineWinner(userChoice, computerChoice));
}

// call `playGame` function
playGame();

// check out my latest Hot Tips here: http://bit.ly/front-end-blog