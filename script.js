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





var mediaItems = [];
var mediaCounter = 0;

var reviews = [];
var ratings = [];

//Brian's Functions
$(".journal_btn").click(function(){

  //Grabs the value of the search box
  mediaCounter++;  
  //var mediaItem = $(this).prev().val();
  var mediaItem = $("#item-input").val();
  mediaItems.push(mediaItem);
  var review = $("#review-area").val();
  reviews.push(review);
  var rating = $('input[name=stars]:checked').val();
  ratings.push(rating)
  localStorage.setItem(`media-item${mediaCounter}` , mediaItem);
  localStorage.setItem(`review${mediaCounter}` , review)
  localStorage.setItem(`rating${mediaCounter}` , rating)
  console.log(mediaItems);
  console.log(reviews);
  console.log(ratings);
  appendJournal();
  })

  function appendJournal() {
    $("#journal").html("");
    for (var i = 0; i < mediaItems.length; i++) {
      let journalDiv = $("<div>");
      journalDiv.html(`<strong>${mediaItems[i]}</strong>: <em>${reviews[i]}</em><br>${ratings[i]} <i class="fas fa-star"></i><hr>`);
      $("#journal").prepend(journalDiv);
      }
  }

})

/*        if (query_count < 10) {
            query_count++;
            let queryBreak = $("<hr>");
            let queryEl = $("<div>");
            queryEl.text(query_param);
            queryEl.attr("data-name" , query_param);
            $(".search-box").append(queryBreak , queryEl);
            queryEl.on("click" , function() {
                var searchCity = $(this).attr("data-name");
                    $("#city").html(searchCity);
                    getCoordinates(searchCity);
                })
            }*/