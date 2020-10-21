// Global API Variables
var searchTerm = "boats";
var resultQuantity = 3;

// MOVIES: OMDB API
var omdbURL = "https://www.omdbapi.com/?s=" + searchTerm + "&y=&plot=short&apikey=trilogy";

// Sam's Work

$.ajax({
  url: omdbURL,
  method: "GET"
}).then(function(response) {
  console.log(response.Search.slice(0,resultQuantity));
});

// BOOKS: Open Library API ~DELAYED RESPONSE +/- 8 Seconds~
var olURL = "http://openlibrary.org/search.json?q=" + searchTerm;

$.ajax({
  url: olURL,
  method: "GET"
}).then(function(response) {
  console.log(response.docs.slice(0,resultQuantity));
});

// Music
var happiURL = "https://api.happi.dev/v1/music?q="+ searchTerm +"&limit="+ resultQuantity +"&apikey=d2578aRvlgVm9prmFLblu2AxeoRSuOLl6Wmq3GTc9AXmUeZjscLyIK9b&type=track";

$.ajax({
  url: happiURL,
  method: "GET"
}).then(function(response) {
  console.log(response.result);
});