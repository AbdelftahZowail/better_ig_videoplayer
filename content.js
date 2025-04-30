// Function to update the video's current time based on seek bar value
function updateVideoTime(video, seekBar) {
    const duration = video.duration;
    const seekBarValue = seekBar.value;
    if (!isNaN(duration)) {
      const currentTime = (seekBarValue / 100) * duration;
      video.currentTime = currentTime;
    }
  }
  function updateSeekBar(video, seekBar) {
    const currentTime = video.currentTime;
    const duration = video.duration;
    if (!isNaN(duration)) {
      seekBar.value = (currentTime / duration) * 100;
    }
  }
  
  // Function to add the seek bar to a video's container
  function addSeekBarToVideoContainer(video) {
    video.muted = false;
    const videoContainer = video.parentElement;
    const seekBarContainer = document.createElement('div'); // Container for seek bar, text, and speed controls
    const timeSpeedContainer = document.createElement('div'); // Container for time and speed text
    const timeText = document.createElement('div');
    const speedText = document.createElement('div');
    const playIndicator = document.createElement('div');
    const seekBar = document.createElement('input');
    // const muteButton = document.createElement('div');

    // muteButton.innerText = !video.muted ? '🔇' : '🔈';
    // muteButton.style.cursor = 'pointer';
    // muteButton.style.marginLeft = 'auto';
    // muteButton.style.paddingRight = '20px';
    // muteButton.addEventListener('click', () => {
    //     video.muted = !video.muted; // Toggle mute
    //     muteButton.innerText = !video.muted ? '🔇' : '🔈'; // Update icon
    // });
    
    seekBar.type = 'range';
    seekBar.className = 'video-seek-bar';
    seekBar.style.position = 'absolute';
    seekBar.style.bottom = '-1px'; // Adjust the position as needed
    seekBar.style.width = '100%'; // Fill the container width

    timeSpeedContainer.style.position = 'absolute';
    if (window.location.href.includes("instagram.com/stories/")) {
        timeSpeedContainer.style.bottom = '80px';
    } else {
        timeSpeedContainer.style.bottom = '20px';
    }
    // timeSpeedContainer.style.width = '50%';
    timeSpeedContainer.style.display = 'flex'; // Display time and speed text elements in a row

    speedText.style.cursor = 'pointer';
    speedText.textContent = '1x';
    speedText.style.marginLeft = '10px';
    speedText.style.marginRight = '10px';
    speedText.addEventListener('click', function() {
        togglePlaybackSpeed(video, speedText);
    });

    playIndicator.textContent = '❚❚';
    playIndicator.style.cursor = 'pointer';
    playIndicator.addEventListener('click', function() {
        if(playIndicator.textContent == '▶'){
            video.play();
        }else{
            video.pause();
        }
    });


    videoContainer.style.position = 'relative'; // Ensure the container has a relative position
    timeSpeedContainer.style.background = 'linear-gradient(to top, transparent, rgba(0, 0, 0, 0.7), transparent)';

    seekBar.addEventListener('input', function() {
        updateVideoTime(video, seekBar);
        updateTimeText(video, timeText);
    });

    videoContainer.appendChild(seekBarContainer);
    seekBarContainer.appendChild(seekBar);
    seekBarContainer.appendChild(timeSpeedContainer);
    timeSpeedContainer.appendChild(timeText);
    timeSpeedContainer.appendChild(speedText);
    timeSpeedContainer.appendChild(playIndicator);
    // timeSpeedContainer.appendChild(muteButton);

    // Update the video time when the seek bar value changes
    // Update the seek bar when the video time updates
    video.addEventListener('timeupdate', function() {
        updateSeekBar(video, seekBar);
        updateTimeText(video, timeText);
    });
    video.addEventListener('pause', function() {
        playIndicator.textContent = '▶'
    });

    // Check when the video is played
    video.addEventListener('play', function() {
        playIndicator.textContent = '❚❚'
    });
}

function togglePlaybackSpeed(video, speedText) {
    const currentSpeed = parseFloat(speedText.textContent);
    const speeds = [1, 1.5, 2, 3]; // Available speeds
    const currentIndex = speeds.indexOf(currentSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    video.playbackRate = nextSpeed;
    speedText.textContent = nextSpeed + 'x';
}

function updateTimeText(video, timeText) {
    const currentTime = formatTime(video.currentTime);
    const totalTime = formatTime(video.duration);
    timeText.textContent = `${currentTime} / ${totalTime}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}    
  function checkForNewVideos() {
    console.log('starting');
    const targetNode = document.body;
    console.log('starting2');
    const config = { childList: true, subtree: true };
    console.log('starting3');
    const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                checkForVideosInNodes(mutation.addedNodes);
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
function checkForVideosInNodes(nodes) {
    nodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the node itself is a video element
            if (node.nodeName.toLowerCase() === 'video') {
                console.log('New video added:', node);
                addSeekBarToVideoContainer(node)
            } else {
                // If not, recursively check its children
                checkForVideosInNodes(node.childNodes);
            }
        }
    });
}

  function addSeekBarsToAllVideoContainers() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      addSeekBarToVideoContainer(video);
    });
  }
  
  // Run the function when the page loads
  window.onload = function() {
    console.log('Page loaded.');
    addSeekBarsToAllVideoContainers();
    checkForNewVideos();
  };
  