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



if (!localStorage.getItem("counter")) {
  var counter = 0;
} else {
  var counter = parseInt(localStorage.getItem("counter"));
  for (var j = counter - 1; j >= 0; j--) {
      var newCounter = j;
      let startupDiv = $("<div>");
      /*var gotItem = JSON.stringify(localStorage.getItem(`media-item${newCounter}`));
      var gotReview = JSON.stringify(localStorage.getItem(`review${newCounter}`));
      var gotRating = JSON.stringify(localStorage.getItem(`rating${newCounter}`));
      startupDiv.html(`<strong>${gotItem}</strong>: <em>${gotReview}</em><br> ${gotRating} <i class="far fa-star"></i><hr>`);
      $("#journal").prepend(startupDiv);*/
  }
}
//console.log(counter);

var mediaItems = [];
var reviews = [];
var ratings = [];
var entries = [];

//Brian's Functions
$(".journal_btn").click(function(){
  counter++;  
  var mediaItem = $("#item-input").val();
  var review = $("#review-area").val();
  var rating = $('input[name=stars]:checked').val();
  const entry = {
    counter: counter,
    item: mediaItem,
    review: review,
    rating: rating
  }
  entries.push(entry);
  //console.log(entry);
  //console.log(entries);
  localStorage.setItem("entries" , JSON.stringify(entries));
  /*localStorage.setItem(`media-item${counter}` , mediaItem);
  localStorage.setItem(`review${counter}` , review)
  localStorage.setItem(`rating${counter}` , rating)*/
  appendJournal();
  })

  function appendJournal() {
    var entryArray = JSON.parse(localStorage.getItem("entries"));
    console.log(entryArray)
    for (var i = entryArray.length - 1; i >= 0; i--) {
      let startupDiv = $("<div>");
      startupDiv.html(`<strong>${entryArray[i].item}</strong>: <em>${entryArray[i].review}</em><br>
        ${entryArray[i].rating} <i class="far fa-star"></i><hr>`);
        $("#journal").append(startupDiv);
      }
      
      /*var newItem = JSON.stringify(localStorage.getItem(`media-item${newIndex}`));
      var newReview = JSON.stringify(localStorage.getItem(`review${newIndex}`));
      var newRating = JSON.stringify(localStorage.getItem(`rating${newIndex}`));
      startupDiv.html(`<strong>${newItem}</strong>: <em>${newReview}</em><br> ${newRating} <i class="far fa-star"></i><hr>`);*/
     
    
    /*$("#journal").html("");
    for (var i = 0; i < mediaItems.length; i++) {
      let journalDiv = $("<div>");
      journalDiv.html(`<strong>${mediaItems[i]}</strong>: <em>${reviews[i]}</em><br>${ratings[i]} <i class="far fa-star"></i><hr>`);
      $("#journal").prepend(journalDiv);
      }*/
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