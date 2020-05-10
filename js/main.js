/*
the plan!

have an array that holds urls and  randomly chooses one to play in an audio tab.
allow users to add to the array of music with a form that pushes content into the array

allow users to create an account
possibly allows them to vote on the next song
possibly add a chat room or that chat room you know about

https://developer.mozilla.org/en-US/docs/Web/Events
https://developers.google.com/youtube/iframe_api_reference#Adding_event_listener
*/

//just the src from iframe embeded links off youtube (and maybe elsewhere) could be condensed to the link string at the end of link
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

        //location.reload();
        onYouTubeIframeAPIReady();    
        done = false;            
    }
}
