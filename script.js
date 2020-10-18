$( document ).ready(function() {
  
  // Global API Variables
var searchTerm = "boats";
var resultQuantity = 3;

// MOVIES: OMDB API
var omdbURL = "https://www.omdbapi.com/?s=" + searchTerm + "&y=&plot=short&apikey=trilogy";

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

// LIVE MUSIC: Bands In Town API
// Only getting one result at a time ~ Looking into other API options
var bitURL = "https://rest.bandsintown.com/artists/" + searchTerm + "?app_id=codingbootcamp";

$.ajax({
  url: bitURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});


//Brian's Functions


var entries;

if (!localStorage.getItem("entries")) {
  $("#journal").html("");
  entries = [];
} else {
  entries = JSON.parse(localStorage.getItem("entries"));
  console.log(entries);
  for (var j = entries.length - 1; j > -1; j--) {
      let startupDiv = $("<div>");
      startupDiv.html(`<strong>${entries[j].item}</strong>: <em>${entries[j].review}</em><br>
        ${entries[j].rating} <i class="far fa-star"></i><hr>`);
      $("#journal").append(startupDiv);
  }
}
//console.log(counter);

$(".journal_btn").click(function(event){
  event.preventDefault();
  var mediaItem = $("#item-input").val();
  var review = $("#review-area").val();
  var rating = $('input[name=stars]:checked').val();
  entry = {
    item: mediaItem,
    review: review,
    rating: rating
  }
  entries.push(entry);
  console.log(entries);
  localStorage.setItem("entries" , JSON.stringify(entries));
  appendJournal();
  })

  function appendJournal() {
    $("#journal").html("");
    entries = JSON.parse(localStorage.getItem("entries"));
    console.log(entries)
    for (var i = entries.length - 1; i >= 0; i--) {
      let appendDiv = $("<div>");
      appendDiv.html(`<strong>${entries[i].item}</strong>: <em>${entries[i].review}</em><br>
        ${entries[i].rating} <i class="far fa-star"></i><hr>`);
        $("#journal").append(appendDiv);
      }
  }

  $("#clear-click").on("click" , function() {
    entries = [];
    localStorage.setItem("entries" , JSON.stringify(entries));
    $("#journal").html("");
  })

})
