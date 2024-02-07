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

const featuredUrl = "https://genius-song-lyrics1.p.rapidapi.com/chart/songs/?time_period=day&per_page=3&page=1";
const featuredOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0b45ad1d65msh236cffafb3a6da2p191e4cjsn188eee869849",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

// define empty arrays for featured artists carousel
const fArtistNameVar = [];
const fLyricsUrlVar = [];
const fImgUrlVar = [];
let artist1 = [];
let artist2 = [];
let artist3 = [];
let recentSearches = [];

// Check if recent searches are present in local storage
if (localStorage.getItem("recentSearches")) {
  // Parse and assign recent searches from local storage
  recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
}

// Call the function to initially create the recent searches elements
createRecentSearchesElements();

// Fetch daily charts from genius API
fetch(featuredUrl, featuredOptions)
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    for (let i = 0; i < result.chart_items.length; i++) {
      var fArtistName = result.chart_items[i].item.full_title;
      var fLyricsUrl = result.chart_items[i].item.url;
      var fImgUrl = result.chart_items[i].item.header_image_thumbnail_url;

      // push featured artists results to empty arrays
      fArtistNameVar.push(fArtistName);
      fLyricsUrlVar.push(fLyricsUrl);
      fImgUrlVar.push(fImgUrl);
    }

    // push results from DOM to artist1 array then adding it to html
    artist1.push(fArtistNameVar[0], fLyricsUrlVar[0], fImgUrlVar[0]);
    $(".a1i").attr("src", artist1[2]);
    $(".f1").attr("action", artist1[1]);
    $(".a1n").text(artist1[0]);

    // push results from DOM to artist2 array then adding it to html
    artist2.push(fArtistNameVar[1], fLyricsUrlVar[1], fImgUrlVar[1]);
    $(".a2i").attr("src", artist2[2]);
    $(".f2").attr("action", artist2[1]);
    $(".a2n").text(artist2[0]);

    // push results from DOM to artist3 array then adding it to html
    artist3.push(fArtistNameVar[2], fLyricsUrlVar[2], fImgUrlVar[2]);
    $(".a3i").attr("src", artist3[2]);
    $(".f3").attr("action", artist3[1]);
    $(".a3n").text(artist3[0]);
  });

// hide lyrics page until search
$(".lyrics-page").css("display", "none");
// click event listener for the search button

// Function to update recent searches in the history box
function createRecentSearchesElements() {
  const recentSearchesContainer = document.getElementById("recent-searches");

  // Clear existing searches
  recentSearchesContainer.innerHTML = "";

  // Add the title for recent searches
  const titleElement = document.createElement("h3");
  titleElement.className = "recent-searches-title";
  titleElement.textContent = "Recent searches";
  recentSearchesContainer.appendChild(titleElement);

  // Add a trash button
  const trashButton = document.createElement("button");
  trashButton.className = "trash-button";
  trashButton.id = "clear-searches";
  trashButton.innerHTML = '<img src="assets/images/trash-icon.png" alt="trash icon" width="30px">';
  trashButton.addEventListener("click", function () {
    recentSearches.length = 0; // Clear the recent searches array
    $(".history-box").css("display", "none");
    localStorage.removeItem("recentSearches"); // Remove from local storage
    createRecentSearchesElements(); // Recreate the HTML
  });
  recentSearchesContainer.appendChild(trashButton);

  // Add recent searches to the container
  recentSearches.forEach(search => {
    const button = document.createElement("button");
    button.className = "history-search";
    button.textContent = search; // Display full search string

    // Add an event listener to the recent search button
    button.addEventListener("click", function () {
      performRecentSearch(search);
    });

    recentSearchesContainer.appendChild(button);
  });

  // Save recent searches to local storage
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

// Function to perform a recent search based on the clicked search string
function performRecentSearch(searchString) {

  console.log(`Clicked on recent search: ${searchString}`);
}

// click event listener for the search button
$(".search-btn").on("click", function () {
  let songNameEl = document.querySelector("#song-input").value;
  let artistNameEl = document.querySelector("#artist-input").value;
  let query = songNameEl + " " + artistNameEl;
  $(".history-box").css("display", "block");
  // Update recent searches array
  const newSearch = `${artistNameEl} - ${songNameEl}`;
  recentSearches.unshift(newSearch); // Add to the beginning of the array
  if (recentSearches.length > 4) {
    recentSearches.pop(); // Keep only the latest 4 searches
  }

  // Update the HTML with recent searches
  createRecentSearchesElements();

  // show lyrics page cards & hide home page
  $(".home-page").css("display", "none");
  $(".lyrics-page").css("display", "block");

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

          // fetch request to get the artist name response from the event API and display desription of event to id #events-list
        });
      fetch;
      fetch(eventUrl + conArtistName, eventOptions)
        .then((response) => response.json())
        .then((result) => {
          var eventResults = result.data;
          var eventsArr = [];

          console.log(eventResults[0].description);
          $("#events-list").html(eventResults[0].description);

          // for (let i = 0; i < eventResults.length; i++) {
          //     eventsArr.push(eventResults[i]);

          // eventResults.forEach(element => {
          //     console.log();
          //     // $('#events-list').html(element.description);

          // });
        });
    });
});

// Check if recent searches are present in local storage
if (localStorage.getItem("recentSearches")) {
  // Parse and assign recent searches from local storage
  recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
}

// Call the function to initially create the recent searches elements
createRecentSearchesElements();
