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
window.onload = function() {
    const youtubePlayer = document.querySelector(".html5-video-player");
    if (youtubePlayer) {
        youtubePlayer.style.width = "50%";

        const newVideoElement = document.createElement('video');
        newVideoElement.id = 'side-video';
        newVideoElement.style.width = "50%";
        youtubePlayer.parentNode.insertBefore(newVideoElement, youtubePlayer.nextSibling);

        const newImageElement = document.createElement('img');
        newImageElement.id = 'side-gif';
        newImageElement.style.width = "50%";
        youtubePlayer.parentNode.insertBefore(newImageElement, youtubePlayer.nextSibling);
    }
}
