// object to hold calories for each day of the week
var objDayCals = {"sunday":3500,"monday":3000,"tuesday":2750,"wednesday":2500,"thursday":1500,"friday":1000,"saturday":2000};

// accept a day as an argument and return the number of calories you consumed
function inputCaloriesByDay(day){
    return objDayCals[day];
}

//call the inputCaloriesByDay() function for each day of the week. Add the results together and return the sum
function getTotalCals(){
    var arrWeekDays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    var totalCals=0;
    for(d=0;d<arrWeekDays.length;d++){
        totalCals += objDayCals[arrWeekDays[d]];
    }
    return totalCals;
}

//  return the idealDailyCalories multiplied by 7
function getIdealCalories(){
    var idealDailyCalories = 2000;
    return idealDailyCalories * 7;
}

// If actual actual calories consumed equals ideal calories consumed, log to the console: "You ate just the right amount of food!"
// If the actual calories consumed is greater than the ideal calories consumed, log to the console: "Time to head to the gym!"
// If the actual calories consumed is less than the ideal calories consumed, log to the console: "Time for seconds!"
function calculateHealthPlan(){
    var actualCalories = getTotalCals();
    var idealCalories = getIdealCalories();
    var planText = "";

    if (actualCalories != idealCalories){
       planText = (actualCalories > idealCalories) ? "Oh boy - Time to head to the gym!" : "Wow - Time for seconds!";
    } else {
        planText = "Good job - You ate just the right amount of food!";
    }
    console.log(actualCalories + " / " + idealCalories + ": " + planText);
}

calculateHealthPlan();