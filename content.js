// Flag to track whether the GIF has been inserted
let gifInserted = false;

// Function to create and insert the new video and image elements
function insertMediaElements() {
  if (gifInserted) return; // Return if the GIF has already been inserted

  const youtubePlayer = document.querySelector(".html5-video-player");
  if (youtubePlayer && !document.getElementById('side-gif')) {
    youtubePlayer.style.height = "60%";

    const newImageElement = document.createElement('img');
    newImageElement.id = 'side-gif';
    newImageElement.style.width = "100%";
    newImageElement.style.height = "40%";

    setTimeout(function() {
      newImageElement.src = 'https://media1.giphy.com/media/Fr5LA2RCQbnVp74CxH/giphy.gif';
      youtubePlayer.parentNode.insertBefore(newImageElement, youtubePlayer.nextSibling);
    }, 500);

    gifInserted = true; // Set the flag to true after inserting the GIF
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