/*fetch('https://dog.ceo/api/breeds/image/random')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log("message: ", myJson.message);
        console.log("status: ", myJson.status);
    });
*/
var image = document.querySelector('.dog-image');

function fetchDog() {
    console.log("click registerd");
    console.log(image);
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => {
            return response.json();
            console.log(response.json())
        }).then(jsonResponse => {
            //console.log(jsonResponse);
            console.log("before", image.src);
            console.log(jsonResponse.message);
            image.src = jsonResponse.message;
            console.log("after", image.src);
        })
}