// Instructions: https://bah.udemy.com/course/javascript-the-basics-for-beginners/learn/lecture/12785641#overview

// My original solution
 var arrChoices = ['bear', 'human', 'gun'];
 var result = "You ";

 function start(){
     var playerChoice = prompt("Bear, Human, or Gun:\n").toLowerCase();
     var computerChoice = arrChoices[Math.floor(Math.random() * 2)];
     
     if (playerChoice != computerChoice){
         if ((playerChoice == 'bear' && computerChoice == 'human') || (playerChoice == 'human' && computerChoice == 'gun') ||
         (playerChoice == 'gun' && computerChoice == 'bear')){
             result += "Win! :)";
         }
         else {
             result += "Lose. :(";
         }
     } else {
         result += "Tied. :|"
     }
     console.log(computerChoice);
     console.log(result);
 }
 start();

 // OBJECTIVES
 /**
 * Winner == Paper > Rock || Rock > Scissors || Scissors > Paper
 * 1. function getUserChoice(userInput)
 *  - convert toLowerCase()
 *  - only allow valid choices
 * 2. function getComputerChoice()
 * 3. function determineWinner(user, comp)
 *  - if user!=comp...
 *      - if user=rock; if comp=paper user loses, else user wins
 *      - if user=paper; if comp=scissors user loses, else user wins
 *      - if user=scissors; if comp=rock user loses, else user wins
 *  - else it's a tie
 * 4. function playGame()
 *  - prompt() for the user's input
 *  - userChoice = getUserChoice(userInput)
 *  - compChoice = getCompChoice()
 *  - determineWinner(userChoice, compChoice)
 * 5. start game by calling playGame()
 */