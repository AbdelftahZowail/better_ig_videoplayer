#  Better Instagram Video Player - Chrome Extension

Enhance your Instagram video viewing experience with this Chrome extension that adds essential playback controls directly onto Instagram videos, including Reels, Stories, and feed videos.

## Problem Solved

The default Instagram video player on the web lacks basic controls like a visible seek bar and playback speed options. This extension addresses that by overlaying intuitive controls onto videos as you browse.

## Features

*   **Custom Seek Bar:** Adds a clearly visible seek bar at the bottom of videos, allowing you to easily scrub through content.
*   **Precise Seeking:** Click or drag the seek bar to jump to specific points in the video.
*   **Time Display:** Shows the current playback time and the total duration of the video (`MM:SS / MM:SS`).
*   **Playback Speed Control:** Adds a speed indicator (e.g., `1x`, `1.5x`, `2x`, `3x`) next to the time display. Click it to cycle through available playback speeds.
*   **Play/Pause Indicator & Button:** Displays the current state (`❚❚` for playing, `▶` for paused) and allows you to click it to toggle play/pause.
*   **Automatic Unmuting:** Videos will start unmuted by default. *(Note: Instagram's own behavior might sometimes override this).*
*   **Dynamic Content Support:** Automatically detects and adds controls to videos loaded dynamically as you scroll through feeds, Reels, or navigate Stories, thanks to `MutationObserver`.
*   **Custom Styling:** Includes CSS for a clean integration of the controls.

## How It Works

1.  **Content Injection:** The extension injects JavaScript (`content.js`) and CSS (`content.css`) into Instagram pages.
2.  **Video Detection:** The script uses `MutationObserver` to constantly watch for `<video>` elements being added to the page.
3.  **Control Overlay:** When a video is detected, the script dynamically creates and adds the seek bar, time display, speed control, and play/pause button elements as children of the video's container.
4.  **Event Binding:** Event listeners are attached to the video element (for time updates, play/pause state) and the new control elements (for seeking, changing speed, toggling play/pause).
5.  **Synchronization:** The script keeps the seek bar position, time display, and play/pause indicator synchronized with the video's current state.

## Prerequisites

*   **Google Chrome:** This is a Chrome extension.

## Installation

Since this extension is not on the Chrome Web Store, you need to load it manually:

1.  **Download Files:** Download the extension files (`manifest.json`, `content.js`, `content.css`) and place them together in a single folder (e.g., `better-ig-videoplayer`).
2.  **Open Chrome Extensions:** Open Google Chrome, type `chrome://extensions` in the address bar, and press Enter.
3.  **Enable Developer Mode:** Toggle the "Developer mode" switch in the top-right corner **on**.
4.  **Load Unpacked:** Click the "Load unpacked" button that appears.
5.  **Select Folder:** Navigate to and select the folder where you saved the extension files (e.g., `better-ig-videoplayer`).
6.  **Done:** The extension should now appear in your list of extensions and will be active on Instagram pages.

## Usage

1.  **Navigate to Instagram:** Go to `www.instagram.com` and browse as usual (feed, Reels, Stories).
2.  **Controls Appear:** As videos load onto the page, the custom seek bar and controls will automatically appear overlaid near the bottom of the video player.
3.  **Interact:**
    *   **Seek:** Click or drag the horizontal seek bar to change the video's current time.
    *   **Change Speed:** Click the speed indicator (e.g., `1x`) to cycle through playback speeds (1x, 1.5x, 2x, 3x).
    *   **Play/Pause:** Click the play/pause symbol (`▶` / `❚❚`) to toggle playback.
