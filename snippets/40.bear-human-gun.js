// Instructions: https://bah.udemy.com/course/javascript-the-basics-for-beginners/learn/lecture/12785641#overview
/**
 * Bear > Human // Human > Gun // Gun > Bear
 * 1. Get the human input
 * 2. Get the computer choice
 * 3. Compare and show who won or if it's a tie
 * 4. Start the game
 */

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