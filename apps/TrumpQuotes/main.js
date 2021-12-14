var endPoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
function getQuote(){
    fetch(endPoint)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayQuote(data.message);
    })
    .catch(function(err){
        console.log(err);
    })
};

function displayQuote(quote) {
    var quoteText = document.querySelector('.quote-text');
    quoteText.textContent = quote;
}

var newQuoteButton = document.querySelector('.new-quote');
newQuoteButton.addEventListener('click', getQuote);

getQuote();