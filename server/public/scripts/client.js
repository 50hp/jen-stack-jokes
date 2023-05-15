console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke);
    getJokes();

}




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
