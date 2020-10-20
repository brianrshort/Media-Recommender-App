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
  for (var j = entries.length - 1; j > -1; j--) {
      let cardEl = $("<div>");
      cardEl.addClass("card m-3");
      let startupDiv = $("<div>");
      startupDiv.addClass("card-body");
      startupDiv.html(`<strong>${entries[j].item}</strong><br><small>${entries[j].type}</small><br><em>${entries[j].review}</em><br>
      ${entries[j].rating} <i class="far fa-star"></i>`);
      cardEl.append(startupDiv);
      $("#journal").append(cardEl);
  }
}

$("#submission").click(function(event){
  event.preventDefault();
  var mediaItem = $("#item-input").val().trim();
  var review = $("#review-area").val().trim();
  var type = $("#media-type").val().trim();
  var rating = $('input[name=stars]:checked').val();
  if (mediaItem === "" || review === "" || type === "" || review.length <= 30){
    $("#item-input").attr("placeholder" , "Your title here");
    $("#media-type").attr("placeholder" , "Your media type here")
    $("#review-area").attr("placeholder" , "Write a review");
  } else {
  entry = {
    item: mediaItem,
    review: review,
    type: type,
    rating: rating
  }
  entries.push(entry);
  localStorage.setItem("entries" , JSON.stringify(entries));
  appendJournal();
  }
  })

  function appendJournal() {
    $("#journal").html("");
    entries = JSON.parse(localStorage.getItem("entries"));
    for (var i = entries.length - 1; i >= 0; i--) {
      let cardDiv = $("<div>");
      cardDiv.addClass("card m-3");
      let appendDiv = $("<div>");
      appendDiv.addClass("card-body");
      appendDiv.html(`<strong>${entries[i].item}</strong><br><small>${entries[i].type}</small><br><em>${entries[i].review}</em><br>
        ${entries[i].rating} <i class="far fa-star"></i>`);
      cardDiv.append(appendDiv);
      $("#journal").append(cardDiv);
    }
   }

  $("#clear-click").on("click" , function() {
    entries = [];
    localStorage.setItem("entries" , JSON.stringify(entries));
    $("#journal").html("");
    $(".summaryDiv").html("");
  })
})
