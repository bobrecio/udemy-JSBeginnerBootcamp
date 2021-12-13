var numberOfCards = 16;//document.getElementsById('numSets').value; // the grid is 4-wide; so muliples of 4 are best
var acCardsArray = [];
var imgCol = null;
var imgRow = null;

var mkAcCardsArray = function(){
    for (i = 0; i < numberOfCards/2; i++){
        var thisCard = {};
        imgCol = Math.floor(Math.random() * 29);
        imgRow = Math.floor(Math.random() * 14);

        var pxRight = (imgCol * 128) + imgCol + 3;
        var pxTop = (imgRow * 128) + imgRow + 3;

        thisCard.name = `${pxRight}|${pxTop}`;
        thisCard.img = `url('ac.png') -${pxRight}px -${pxTop}px`;
        //console.log(thisCard);
        acCardsArray.push(thisCard);
    }
}
mkAcCardsArray();

// Duplicate cardsArray to create a match for each card
var gameGrid = acCardsArray.concat(acCardsArray);//cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(function () {
    return 0.5 - Math.random();
})

// Grab the div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');
// Create a section element and assign it to variable grid
var grid = document.createElement('section');
// Give section element a class of grid.
grid.setAttribute('class', 'grid');
// Append the grid section to the game-board div
game.appendChild(grid);
// grab the div to show the number of guesses
var guessCountDisplay = document.getElementById('guesses');
var matchCountDisplay = document.getElementById('matches');

var highScore = (localStorage.getItem('highScore')) ? localStorage.getItem('highScore') : 9999;
var highScoreDisplay = document.getElementById('highScore');
var displayHighScore = function(thisScore){
    highScoreDisplay.innerText = (thisScore !== 9999) ? `${thisScore} is your best` :'No high score';
}
displayHighScore(highScore);

// Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++) {
    // create a div element and assign to variable card
    var card = document.createElement('div');
    // Apply a card class to that div
    card.classList.add('card');
    // Set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;

    // Create front of card
    var front = document.createElement('div');
    front.classList.add('front');

    // Create back of card
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.background = `${gameGrid[i].img}`;

    // Append card to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';
var guessCount = 0;
var matchCount = 0;
var count = 0;
var previousTarget = null;
var delay = 1200;

// Add match CSS
var match = function () {
    var selected = document.querySelectorAll('.selected');
    // loop through the array like object containing `selected` class
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
};

// Reset guesses after two attempts
var resetGuesses = function () {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};


// Add event listener to grid
grid.addEventListener('click', function (event) {
    // Declare variable to target our clicked item
    var clicked = event.target;
    // Do not allow the grid section itself to be selected;
    // only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }
    // We only want to add `selected` class if the current count is less than 2
    if (count < 2) {
        count++;

        if (count === 1) {
            // Assign first guess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            // Assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        // If both guesses are not empty
        if (firstGuess !== '' && secondGuess !== '') {
            guessCount++;
            // And the firstGuess matches secondGuess
            if (firstGuess === secondGuess) {
                // Run the match function
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
                matchCount++;
                matchCountDisplay.innerText = `${matchCount} of ${gameGrid.length/2} matched`;
                if (matchCount === gameGrid.length/2 && guessCount < highScore){
                    displayHighScore(guessCount);
                    localStorage.setItem('highScore', guessCount);
                }
            } else {
                setTimeout(resetGuesses, delay);
            }
            guessCountDisplay.innerText = guessCount;
        }
        previousTarget = clicked;
    }
});
