// Declared a songName variable for the input song value.
// let songNameEl = document.querySelector("#song-input").value;

// Assingn the songName to the variable query
// let query = songNameEl;

// Build up the lyricsURL
let lyricsURL = "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=";

// Build up the queryURL to call the API with the 'query' as a template literal
// const queryURL = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${query}&per_page=10&page=1&text-format=html`;

// define event url and options
const eventUrl = "https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=";
const eventOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0b45ad1d65msh236cffafb3a6da2p191e4cjsn188eee869849",
    "X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com",
  },
};

// Inlcuding options in the header elements
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0b45ad1d65msh236cffafb3a6da2p191e4cjsn188eee869849",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

// hide lyrics page until search
$(".lyrics-page").css("display", "none");

// click event listener for the search button

$(".search-btn").on("click", function () {
  // show lyrics page cards & hide home page
  $(".home-page").css("display", "none");
  $(".lyrics-page").css("display", "block");

  let songNameEl = document.querySelector("#song-input").value;
  let artistNameEl = document.querySelector("#artist-input").value;
  let query = songNameEl + " " + artistNameEl;

  const queryURL = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${query}&per_page=1&page=1&text-format=html`;

  // fetch request to get the song ID and lyrics response from the API and display in the section of the dom with the class name .lyrics-display
  fetch(queryURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result);

      // displaying the artist name in the html dom
      $("#artist-name").html(result.hits[0].result.artist_names);

      // fetching the image thumbnail URL
      let imgURL = result.hits[0].result.header_image_thumbnail_url;
      // console.log(imgURL)
      // displaying the artist name in the html dom
      $("#artist-name").html(result.hits[0].result.artist_names);
      // define concert artist name
      let conArtistName = result.hits[0].result.artist_names;

      // fetching the image thumbnail URL
      let imgURL = result.hits[0].result.header_image_thumbnail_url;
      // console.log(imgURL)

      // Changing the img attribute to display the img thumbnail url
      $(".card-img-top").attr("src", imgURL);
      // console.log(queryURL)
      let songID = result.hits[0].result.id;

      fetch(lyricsURL + songID, options)
        .then((response) => response.json())
        .then((result) => {
          $("#lyrics-title").html(result.lyrics.tracking_data.title);
          $("#lyrics-content").html(result.lyrics.lyrics.body.html);
          $("#album-name").html(result.lyrics.tracking_data.primary_album);
          console.log(result);
        });
    });
});
