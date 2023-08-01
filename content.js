chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "playMedia") {
            const extension = new URL(request.url).pathname.split('.').pop();
            let mediaElement;
            
            if (["mp4", "webm", "ogg"].includes(extension)) { // It's a video
                mediaElement = document.getElementById('side-video');
                if (mediaElement) {
                    mediaElement.src = request.url;
                    mediaElement.play();
                }
            } else if (extension === "gif") { // It's a GIF
                mediaElement = document.getElementById('side-gif');
                if (mediaElement) {
                    mediaElement.src = request.url;
                }
            }
        }
    }
);

// Shrink the YouTube video player and add a new video player
/*window.onload = function() {
    const youtubePlayer = document.querySelector(".html5-video-player");
    if (youtubePlayer) {
        youtubePlayer.style.height = "60%";

        const newVideoElement = document.createElement('video');
        newVideoElement.id = 'side-video';
        newVideoElement.style.width = "35%";
        youtubePlayer.parentNode.insertBefore(newVideoElement, youtubePlayer.nextSibling);

        const newImageElement = document.createElement('img');
        newImageElement.id = 'side-gif';
        newImageElement.style.width = "100%";
		newImageElement.style.height = "40%";
        newImageElement.src = 'https://media1.giphy.com/media/Fr5LA2RCQbnVp74CxH/giphy.gif'; 
        youtubePlayer.parentNode.insertBefore(newImageElement, youtubePlayer.nextSibling);
    }
}*/

// Function to create and insert the new video and image elements
function insertMediaElements() {
    const youtubePlayer = document.querySelector(".html5-video-player");
    if (youtubePlayer && !document.getElementById('side-video') && !document.getElementById('side-gif')) {
        youtubePlayer.style.height = "60%";

        const newVideoElement = document.createElement('video');
        newVideoElement.id = 'side-video';
        newVideoElement.style.width = "35%";
        youtubePlayer.parentNode.insertBefore(newVideoElement, youtubePlayer.nextSibling);

        const newImageElement = document.createElement('img');
        newImageElement.id = 'side-gif';
        newImageElement.style.width = "100%";
		newImageElement.style.height = "40%";

        setTimeout(function() {
            newImageElement.src = 'https://media1.giphy.com/media/Fr5LA2RCQbnVp74CxH/giphy.gif'; 
            youtubePlayer.parentNode.insertBefore(newImageElement, youtubePlayer.nextSibling);
        }, 500);
    }
}

// Create a MutationObserver instance
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
            insertMediaElements();
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document, { childList: true, subtree: true });