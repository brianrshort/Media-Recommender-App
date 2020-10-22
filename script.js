$( document ).ready(function() {
  
// Sam's Work

// Go button Function
$('.go-btn').click(function(e) {
  e.preventDefault();
  searchTerm = $('#input-field').val();
  //console.log(searchTerm);

  // Search Filter Array
  var checkedBoxes = [
  
  bookCategory = $("input[name=book]:checked").val(),
  movieCategory = $("input[name=movie]:checked").val(),
  songCategory = $("input[name=song]:checked").val(),
  ]

  // See which filters are checked
  for (let i = 0; i < checkedBoxes.length; i++) {
    if (checkedBoxes[i] == "book") {
      bookSearch();
    } else if (checkedBoxes[i] == "movie") {
      movieSearch();
    } else if (checkedBoxes[i] == "song") {
      songSearch();
    }
  }

})

// Global API Variables
var searchTerm = "boats";
var resultQuantity = 3;
//Input and result id

// MOVIES: OMDB API
function movieSearch(searchEl) {
var omdbURL = "https://www.omdbapi.com/?s=" + searchTerm + "&y=&plot=short&apikey=trilogy";
$.ajax({
  url: omdbURL,
  method: "GET"
}).then(function(response) {
  console.log(response)
  console.log(response.Search[0].Poster);
  console.log(response.Search.slice(0,resultQuantity));
 

});
}

// BOOKS: Open Library API ~DELAYED RESPONSE +/- 8 Seconds~
function bookSearch() {
var olURL = "http://openlibrary.org/search.json?q=" + searchTerm;
$.ajax({
  url: olURL,
  method: "GET"
}).then(function(response) {
  console.log(response.docs.slice(0,resultQuantity));
});
}

// Music
function songSearch() {
var happiURL = "https://api.happi.dev/v1/music?q="+ searchTerm +"&limit="+ resultQuantity +"&apikey=d2578aRvlgVm9prmFLblu2AxeoRSuOLl6Wmq3GTc9AXmUeZjscLyIK9b&type=track";
$.ajax({
  url: happiURL,
  method: "GET"
}).then(function(response) {
  console.log(response.result);
});
}

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
  var rating = $("#stars").val();
  if (mediaItem === "" ||  type === "" || review === "" || review.length <= 30){
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
    
  })
})
