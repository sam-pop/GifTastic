var apiKey = "yLcI2YzFd7HS2iXNcVmAYoktCbwK6U9b"; // giphy api key
var limit = 2; // the number of returned results
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