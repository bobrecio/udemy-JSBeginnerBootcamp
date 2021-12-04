var rollValue = Math.floor(Math.random() * 6);

switch(rollValue) {
    case 1:
        console.log(rollValue + " is the lowest you can go.");
        break;
    case 2:
    case 3:
    case 4:
    case 5:
        console.log(rollValue);
        break;
    case 6:
        console.log(rollValue + " is the highest you can go.");
        break;
    default:
        console.log("0: Roll again.")
}