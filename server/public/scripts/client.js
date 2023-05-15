console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke);
    getJokes();

}

// function to call sever and recive the jokes array.
function getJokes() {


    $.ajax({
        method: 'GET',
        url: '/jokes'
    }).then(function(response) {
        renderJokesToDOM(response);

    }).catch(function(err) {
        console.log('server response failed', err)
        alert('server response failed', err)
    });
}

//function to loop through an array and display each object in a list
function renderJokesToDOM(array) {

    $('#outputDiv').empty();

    for(let item of array) {

        $('#outputDiv').append(`

            <ul>
            <li>${item.whoseJoke}</li>
            <li>${item.jokeQuestion}</li>
            <li>${item.punchLine}</li>
            </ul>

            `);
    }
}

//function to capture the 3 inputs and send them in a object to the sever.
function addJoke() {

    let whoseJokeIn = $('#whoseJokeIn').val();
    let jokeQuestion = $('#questionIn').val();
    let punchLine = $('#punchlineIn').val();
    
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data:{
            whoseJoke: whoseJokeIn,
            jokeQuestion: jokeQuestion,
            punchLine: punchLine,
        }
    }).then(function(response) {
        console.log('successful post');
        getJokes();
    }).catch(function(err) {
        alert('server response failed');
        console.log('server response failed', err);
    });

}
