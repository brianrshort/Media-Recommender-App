$( document ).ready(function() {
  
  // Sam's Work
  
  // Go button Function
  $('#searchbtn ').click(function(e) {
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
    
  });
  //RELOAD BUTTON
  //Bettys work
  $('#reload').on("click",function(){
    window.location.reload(true);
  
  })
  
  // Global API Variables
  var searchTerm = "boats";
  var resultQuantity = 3;
  //Input and result id
  
  // MOVIES: OMDB API
  function movieSearch() {
    $('#input-field').val("");
  var omdbURL = "https://www.omdbapi.com/?s=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    $.ajax({
      url: omdbURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      console.log(response.Search[0]);
      //Betty's Work
      // making loop for the movie search
      var movies = response.Search;
      var output = '';
  
      $.each(movies,(index,movie)=>{
        output +=  `
        
            <div class =" box" >
              <img src = "${movie.Poster}">
              <h5>${movie.Title}</h5>
              <p>year:${movie.Year}</p>
              <a onclick = "movieSelected('${movie.imdbID}')" class = "btn" href = "#">Movie Details</a>
            </div>   
      
  
        `;
  
      });
    
    $("#searchresults").html(output);//this print the result in the result box
  
    });
    
   
  }
  // WORKING ON MOVIE DETALE PAGE 
  
  /*
  function movieSelected(id){
  sessionStorage.setItem('movieId',id);
  window.location = 'movie.html';
  return false;
  
  }
  
  function getmovie(){
    
    
    var movieId = sessionStorage.getItem('movieId')
  
    var omdbURL = "https://www.omdbapi.com/?i=" + movieId + "&y=&plot=short&apikey=trilogy";
  $.ajax({
    url: omdbURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
  
  
  });
  }
  getmovie()
  */
  
  // BOOKS: Open Library API ~DELAYED RESPONSE +/- 8 Seconds~
  function bookSearch() {
    $('#input-field').val("");
  var olURL = "http://openlibrary.org/search.json?q=" + searchTerm;
  $.ajax({
    url: olURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.docs);
    //Betty's Work
    //for loop for Books
    var books = response.docs;
  
   for(var i = 0; i < books.length; i++){
    var divb = $("<div>").attr("class"," box")
    var artistImage = $("<img>").attr("src","http://covers.openlibrary.org/b/isbn/" + books[i].isbn[1] +".jpg"  );//not working
    var title = $("<h5>").text( books[i].title);
    var author = $("<p>").text( books[i].author_name);
    $("#searchresults").append(divb);
    divb.val("");
    divb.append(artistImage);
    divb.append(title);
   divb.append(author);
  
  
   }
  
  });
  }
  
  // Music
  function songSearch() {
    $('#input-field').val("");
    
  var happiURL = "https://api.happi.dev/v1/music?q="+ searchTerm +"&limit="+ resultQuantity +"&apikey=d2578aRvlgVm9prmFLblu2AxeoRSuOLl6Wmq3GTc9AXmUeZjscLyIK9b&type=track";
  $.ajax({
    url: happiURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
   console.log(response.result.cover);
  //Betty's Work 
  //for loop for songs
   var songs = response.result;
  
   for(var i = 0; i < songs.length; i++){
    var divs = $("<div>").attr("class","cell large-auto  box")
    var artistImage = $("<img>").attr("src", songs[i].cover);
    var artist = $("<h5>").text( songs[i].artist);
    var album = $("<p>").text( songs[i].album);
    $("#searchresults").append(divs);
    divs.val("");
    divs.append(artistImage);
    divs.append(artist);
   divs.append(album);
  
  
  
  
   }
  
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
    var type = $("input[name=category]:checked").val();
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
  