var limit = 10; // the number of returned results
var searchParam; //TODO: initialize
var apiKey = "yLcI2YzFd7HS2iXNcVmAYoktCbwK6U9b"; // giphy api key

var apiURL = "http://api.giphy.com/v1/gifs/search?q=" + searchParam + "&api_key=" + apiKey + "&limit=" + limit;