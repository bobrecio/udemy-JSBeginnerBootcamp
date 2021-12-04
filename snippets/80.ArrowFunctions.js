var func1 = function(){
    return 'Hi';
}

var func2 = () => 'Hi';

var func3 = () => {return 'Hi'};

var add = () => {return 2 + 2};

var multiply = (a, b) => {return a * b};

var numbers = [2,4,6,8];
var es5squared = numbers.map(function (n) {return n * n});
var es6squared_block = numbers.map((n) => {return n * n});
var es6squared_concise = numbers.map(n => n * n);