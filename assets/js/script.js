// Declared a songName variable for the input song value.
// let songNameEl = document.querySelector("#song-input").value;

// Assingn the songName to the variable query
// let query = songNameEl;

// Build up the lyricsURL
let lyricsURL = "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=";

// Build up the queryURL to call the API with the 'query' as a template literal
// const queryURL = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${query}&per_page=10&page=1&text-format=html`;

// Inlcuding options in the header elements
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0b45ad1d65msh236cffafb3a6da2p191e4cjsn188eee869849',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
};

// click event listener for the search button

$(".search-btn").on('click', function () {

    let query = document.querySelector("#song-input").value;

    const queryURL = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${query}&per_page=10&page=1&text-format=html`;


    // fetch request to get the song ID and lyrics response from the API and display in the section of the dom with the class name .lyrics-display
    fetch(queryURL, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            let songID = result.hits[0].result.id;

            fetch(lyricsURL + songID, options)
                .then((response) => response.json())
                .then((result) => {
                    $("#lyrics-title").html(result.lyrics.tracking_data.title);
                    $("#lyrics-content").html(result.lyrics.lyrics.body.html);
                    // .then((result) => console.log(result.lyrics.tracking_data.title));
                });
        })
})
