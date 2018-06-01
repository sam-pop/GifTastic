var apiKey = "yLcI2YzFd7HS2iXNcVmAYoktCbwK6U9b"; // giphy api key
var limit = 10; // the number of returned results
var searchParam; // holds the query parameter

var topics = ["Jerry Seinfeld", "George Costanza", "Elaine Benes", "Cosmo Kramer", "Newman", "Frank Costanza", "Estelle Costanza"]; // button array

// creates the buttons from the topics array and appends them to the page
function populateButtons() {
    $('.displayBtns').empty();
    topics.forEach(function (item) {
        var btn = $('<button>').addClass('btn red arrBtn');
        btn.text(item);
        $('.displayBtns').append(btn);
        $('.displayBtns').append("<br><br>");
    });
}

// creates the page content (cards holding gifs and rating) from the api response
function populateMain(res) {
    var main = $('.main');

    main.empty();
    for (var i = 0; i < res.data.length; i++) {
        var rating = res.data[i].rating;
        var img = $('<img>').attr({
            'src': res.data[i].images.fixed_height_still.url,
            'data-still': res.data[i].images.fixed_height_still.url, // saves the still image src
            'data-live': res.data[i].images.fixed_height_downsampled.url // saves the live image src
        }).addClass('gifImg responsive-img');
        if (rating && img) {
            var card = $('<div>').addClass('card center');
            var cardImage = $('<div>').addClass('card-image').append(img);
            var cardTitle = $('<div>').addClass('card-title').append("Rating: " + "<b>" + rating + "</b>");
            card.append(cardImage);
            card.append(cardTitle);
            main.append(card);
            main.append("<br>");
        }
    }
    $('.tip').show();

}

// on click adds the current search field value to the array and recreates the buttons on the screen
$('#submitBtn').click(function (e) {
    e.preventDefault();
    var inputText = $('#searchField').val().trim();
    if (topics.indexOf(inputText) == -1 && inputText !== "") {
        topics.push(inputText);
        populateButtons();
    }
});

// on click updates the search parameter and runs the API query
$(document).on('click', '.arrBtn', function () {
    searchParam = this.textContent.replace(/ /g, "+");
    runAPI();
});

// on click changes the image source between live and still images
$(document).on('click', '.gifImg', function () {
    if ($(this).attr('src') == $(this).attr('data-still')) {
        $(this).attr('src', $(this).attr('data-live'));
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        //copy link to clipboard
        var dt = new clipboard.DT();
        dt.setData("text/plain", $(this).attr('data-live'));
        clipboard.write(dt);
        M.toast({
            html: '<i class="material-icons">content_copy</i>Gif link copied to clipboard!',
            classes: 'copyToast green'
        });
    }
});


// fetches json from the giphy API
function runAPI() {
    var urlAPI = "http://api.giphy.com/v1/gifs/search?q=" + searchParam + "&api_key=" + apiKey + "&limit=" + limit;
    $.ajax({
        url: urlAPI,
        type: "GET",
        success: function (res) {
            populateMain(res); // creates the main content of the page
        },
        error: function () {
            console.log("API ERROR");
        }
    });
}

$(function () {
    $('.tip').hide();
    populateButtons(); // creates the initial buttons on document ready

});