var apiKey = "yLcI2YzFd7HS2iXNcVmAYoktCbwK6U9b"; // giphy api key
var limit = 10; // the number of returned results
var searchParam;

var buttons = ["Jerry Seinfeld", "George Costanza", "Elaine Benes", "Cosmo Kramer", "Newman"]; // button array

function populateButtons() {
    $('.displayBtns').empty();
    buttons.forEach(function (item) {
        var btn = $('<button>').addClass('btn red arrBtn');
        btn.text(item);
        $('.displayBtns').append(btn);
        $('.displayBtns').append("<br><br>");
    });
}

function populateMain(res) {
    var main = $('.main');

    main.empty();

    for (var i = 0; i < res.data.length; i++) {
        var rating = res.rating;
        var img = $('<img>').attr({
            'src': res.data[i].images.fixed_height_still.url,
            'data-still': res.data[i].images.fixed_height_still.url,
            'data-live': res.data[i].images.fixed_height_downsampled.url
        }).addClass('gifImg responsive-img ');
        main.append(res.data[i].rating);
        main.append(img);
        main.append("&nbsp;&nbsp;");
    }
}

$('#submitBtn').click(function (e) {
    e.preventDefault();
    var inputText = $('#searchField').val().trim();
    if (buttons.indexOf(inputText) == -1) {
        buttons.push(inputText);
        populateButtons();
    }
});

$(document).on('click', '.arrBtn', function () {
    searchParam = this.textContent.replace(/ /g, "+");
    runAPI();
});

$(document).on('click', '.gifImg', function () {

    if ($(this).attr('src') == $(this).attr('data-still')) {
        $(this).attr('src', $(this).attr('data-live'));
    } else $(this).attr('src', $(this).attr('data-still'));

});

function runAPI() {
    var urlAPI = "http://api.giphy.com/v1/gifs/search?q=" + searchParam + "&api_key=" + apiKey + "&limit=" + limit;
    $.ajax({
        url: urlAPI,
        type: "GET",
        success: function (res) {
            populateMain(res);

        },
        error: function () {
            console.log("API ERROR");
        }
    });
}

$(function () {
    populateButtons();
});