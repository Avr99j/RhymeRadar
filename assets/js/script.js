// let songName = prompt("Enter a song or artist name below:")
let query = songName;
let songID;
let lyricsURL = "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=";
const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${query}&per_page=10&page=1&text-format = html`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "bb7e3ea63dmshade5864f1bcdab9p12aba7jsnf60c299cee61",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    let songID = result.hits[0].result.id;
    // console.log(songID)

    fetch(lyricsURL + songID, options)
      .then((response) => response.json())
      // .then(result => console.log(result.lyrics.lyrics.body.html));
      .then((result) => (document.body.innerHTML = result.lyrics.lyrics.body.html));
  });
// pullrequest test
