// Build up the lyricsURL
let lyricsURL = "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=";

// define event url and options
const eventUrl = 'https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=';
const eventOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0b45ad1d65msh236cffafb3a6da2p191e4cjsn188eee869849',
		'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
	}
};

// Inlcuding options in the header elements
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0b45ad1d65msh236cffafb3a6da2p191e4cjsn188eee869849',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'

    }
};

const featuredUrl = 'https://genius-song-lyrics1.p.rapidapi.com/chart/songs/?time_period=day&per_page=3&page=1';
const featuredOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0b45ad1d65msh236cffafb3a6da2p191e4cjsn188eee869849',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

// define empty arrays for featured artists carousel
const fArtistNameVar = [];
const fLyricsUrlVar = [];
const fImgUrlVar = [];
let artist1 =[];
let artist2 =[];
let artist3 =[];
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
 var fImgUrl = result.chart_items[i].item.header_image_thumbnail_url

// push featured artists results to empty arrays
            fArtistNameVar.push (fArtistName)
            fLyricsUrlVar.push (fLyricsUrl)
            fImgUrlVar.push (fImgUrl)
      }
 // push results from DOM to artist1 array then adding it to html
artist1.push(fArtistNameVar[0], fLyricsUrlVar[0], fImgUrlVar[0])
$(".a1i").attr('src', artist1[2]);
$(".f1").attr('action', artist1[1]);
$(".a1n").text(artist1[0]);
        
  // push results from DOM to artist2 array then adding it to html
  artist2.push(fArtistNameVar[1], fLyricsUrlVar[1], fImgUrlVar[1])
  $(".a2i").attr('src', artist2[2]);
  $(".f2").attr('action', artist2[1]);
  $(".a2n").text(artist2[0]);
      
      
  // push results from DOM to artist3 array then adding it to html
  artist3.push(fArtistNameVar[2], fLyricsUrlVar[2], fImgUrlVar[2])
  $(".a3i").attr('src', artist3[2]);
  $(".f3").attr('action', artist3[1]);
  $(".a3n").text(artist3[0]);
})

// hide lyrics page until search
$(".lyrics-page").css("display", "none");

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

  // Add recent searches to the container, avoiding duplicates
const uniqueRecentSearches = [...new Set(recentSearches)]; // Remove duplicates
uniqueRecentSearches.forEach(search => {
    const button = document.createElement("button");
    button.className = "history-search";

    // Display the search string based on the format
    if (search.includes(" - ")) {
        const [artist, song] = search.split(" - ");
        button.textContent = song ? `${artist} - ${song}` : artist; // Display 'artist - song' or 'artist' search
    } else if (search.includes(" ")) {
        button.textContent = search; // Display 'the song search' or 'artist search'
    } else {
        button.textContent = search; // Display 'artist search'
    }

    // Add an event listener to the recent search button
    button.addEventListener("click", function () {
        performRecentSearch(search);
    });

    recentSearchesContainer.appendChild(button);
});

  // Save recent searches to local storage
  localStorage.setItem("recentSearches", JSON.stringify(uniqueRecentSearches));
}
  
// Function to perform a recent search based on the clicked search string
function performRecentSearch(searchString) {
  console.log(`Clicked on recent search: ${searchString}`);

  // Extract artist and song names from the clicked search string
  const [artistName, songName] = searchString.split(" - ");

  // Update the input fields with the extracted artist and song names
  document.querySelector("#artist-input").value = artistName || "";
  document.querySelector("#song-input").value = songName || "";

  // Trigger the click event for the search button to perform a new search
  $(".search-btn").click();
}

// click event listener for the search button
$(".search-btn").on('click', function () {
  let songNameEl = document.querySelector("#song-input").value;
  let artistNameEl = document.querySelector("#artist-input").value;
  let query = songNameEl + " " + artistNameEl;
  $(".history-box").css("display", "block");

  // Update recent searches array with correctly formatted search
  const newSearch = artistNameEl && songNameEl
      ? `${artistNameEl} - ${songNameEl}`
      : artistNameEl || songNameEl || '';
  recentSearches.unshift(newSearch); // Add to the beginning of the array
  if (recentSearches.length > 4) {
      recentSearches.pop(); // Keep only the latest 4 searches
  }

  // Update the HTML with recent searches
  createRecentSearchesElements();

  // show lyrics page cards & hide home page
  $(".home-page").css("display", "none");
  $(".lyrics-page").css("display", "block");

  const queryURL = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${query}&per_page=1&page=1&text_format=html`;

  // fetch request to get the song ID and lyrics response from the API and display in the section of the dom with the class name .lyrics-display
  fetch(queryURL, options)
      .then(function (response) {
          return response.json();
      })
      .then(function (result) {
          // displaying the artist name in the html dom
          $("#artist-name").html(result.hits[0].result.artist_names);
          // define concert artist name
          let conArtistName = result.hits[0].result.artist_names;

          // fetching the image thumbnail URL
          let imgURL = result.hits[0].result.header_image_thumbnail_url;

          // Changing the img attribute to display the img thumbnail url
          $(".card-img-top").attr('src', imgURL);

          let songID = result.hits[0].result.id;

          fetch(lyricsURL + songID + "&text_format=html", options)
              .then((response) => response.json())
              .then((result) => {
                  $("#lyrics-title").html(result.lyrics.tracking_data.title);

                  // Create a jQuery object from the fetched HTML
                  var $tempElement = $('<div>').html(result.lyrics.lyrics.body.html);

                  // Remove all anchor tags (hyperlinks) from the fetched HTML
                  $tempElement.find('a').replaceWith(function () {
                      return $(this).text();
                  });

                  // Extract the modified HTML without hyperlinks
                  var modifiedHTML = $tempElement.html();

                  $("#lyrics-content").html(modifiedHTML);
                  $("#album-name").html(result.lyrics.tracking_data.primary_album);
              });

          fetch(eventUrl + conArtistName, eventOptions)
              .then((response) => response.json())
              .then((result) => {
                  var event1 = []
                  var event2 = []
                  var event3 = []
                  var eventArtist = []
                  var eventVenue = []
                  var eventDate1 = []

                  for (let i = 0; i <= 3; i++) {
                      var eventArtistName = result.data[i]?.name;
                      var eventVenueName = result.data[i]?.location.name;
                      var date = result.data[i]?.endDate;
                      var eventDate = date.split("-").reverse().join("-")
                      eventArtist.push(eventArtistName)
                      eventVenue.push(eventVenueName)
                      eventDate1.push(eventDate)
                  }

                  event1.push(eventArtist[0], eventVenue[0], eventDate1[0])
                  event2.push(eventArtist[1], eventVenue[1], eventDate1[1])
                  event3.push(eventArtist[2], eventVenue[2], eventDate1[2])

                  if (typeof result.data !== 'undefined' && result.data !== null && result.data.length > 0) {
                      // Add the data to your HTML using jQuery .html() method
                      $('#events-list').html(event1[1] + " " + event1[2] + '<br>' + event2[1] + " " + event2[2] + '<br>' + event3[1] + " " + event3[2]);
                  } else {
                      // Display a message indicating no events scheduled
                      $('#events-list').html('This artist does not have any events scheduled');
                  }

              })
      })
})


// Check if recent searches are present in local storage
if (localStorage.getItem("recentSearches")) {
    // Parse and assign recent searches from local storage
    recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
  }
  
  // Call the function to initially create the recent searches elements
  createRecentSearchesElements();






