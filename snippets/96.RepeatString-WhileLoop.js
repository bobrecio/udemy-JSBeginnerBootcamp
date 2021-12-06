function repeatString(str,num) {

    var finalString = '(while) ';

    if (num > 0) {

        i=1;

        while (i <= num){

            finalString += str;
            
            i++;
            
        }

    }

    return finalString;
}