/*
the plan!

have an array that holds urls and uses a switch function to randomly choose one to play in an audio tab.
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
/*
 function createNewVideo(newVideo) {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: newVideo,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
}
  
*/


document.addEventListener("DOMContentLoaded", function(){
    
});
/*
//locate the musicPlayer element
const musicPlayer = document.getElementById("music-player");

//if music has stopped, change the track
musicPlayer.addEventListener('complete', function() {
    musicPlayer.setAttribute("src", musicArray[2]);
}, false);

document.getElementById('p').addEventListener('mouseover', function() {
    this.innerText = "Reset the browser!";
    musicPlayer.setAttribute("src", musicArray[getRandomInt(musicArray.length)] + '?rel=0&amp;autoplay=1');
});



*/
