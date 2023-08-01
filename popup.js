document.getElementById('play-button').addEventListener('click', function() {
    const url = document.getElementById('video-url').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "playMedia", url: url});
    });
});
