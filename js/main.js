document.addEventListener('DOMContentLoaded', (event) => {
//an array of all tracks available to musicPlayer
const musicArray = [
    "jQJET2nexX4",
    "KhRU5qlX3k8",
    "71xGwxakYVk",
    "l0y3-VYgJ8E"

];

//randomly selects a track
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

//reorganizes musicArray to prevent song repetitions
function preventRepeatingSong() {
  let currentVideo = player.getVideoUrl();
  let currentVideoId = currentVideo.slice(currentVideo.indexOf("v="),currentVideo.length);
  currentVideoId = currentVideoId.slice(2, currentVideoId.length);
  musicArray.splice(musicArray.indexOf(currentVideoId), 1);
  musicArray.push(currentVideoId);
}

//This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');
            
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//This function creates an <iframe> (and YouTube player)
//after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: musicArray[getRandomInt(musicArray.length-1)],
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

//displays the musicArray to showcase that it is functioning properly
document.getElementById("musicArrayText").innerText = musicArray;

//The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

//The API calls this function when the player's state changes.
let done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED && !done) {
        done = true;
        player.destroy();
    }
    if (done) {
        //prevents replaying of the same song
        preventRepeatingSong();
        document.getElementById("musicArrayText").innerText = musicArray;

        //notifies player that a new song can be played
        onYouTubeIframeAPIReady();    
        done = false;            
    }
}

//update the musicArray with the ids scriptInput and scriptButton and prevent duplicates
function updateMusicArray() {
  let addedVideo = scriptInput.value;
  let addedVideoId = addedVideo.slice(addedVideo.indexOf("v="),addedVideo.length);
  addedVideoId = addedVideoId.slice(2, addedVideoId.length);
  if (musicArray.includes(addedVideoId)) {
    alert("Video is already included in the track-list.");
  } else {
    musicArray.unshift(addedVideoId);
    document.getElementById("musicArrayText").innerText = musicArray;
  }
  
}

//input validation and add input to musicArray
const scriptInput = document.getElementById("scriptInput");
const scriptButton = document.getElementById("scriptButton");

scriptButton.addEventListener("click", function() {
  if (scriptInput.value.includes("youtube.com")) {
    updateMusicArray();
  } else {
    alert("Incompatible content. Please use a YouTube.com video.");
  }
}, false);

});