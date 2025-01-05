const elementsToHide = [
    '#header-bar',
    '.watch-below-the-player',
    '#masthead-container',
    '#below',
    '#items',
    '.ytp-player-content.ytp-iv-player-content',
    '.ytp-ce-element',
    '.ytp-endscreen-content',
    '.ytp-autonav-toggle-button-container'
];

console.log("YouTube Hider script is running...");

// Debounce function
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

function disable_autoplay() {
    const autoplayButtons = document.getElementsByClassName('ytp-button');
    for (let i = 0; i < autoplayButtons.length; i++) {
        const button = autoplayButtons[i];
        if (button.getAttribute('aria-label') === 'Autoplay is on') {
            console.log('Disabling autoplay...');
            button.click();
        }
    }
}

// Function to hide elements
function hideElements() {
    const selector = elementsToHide.join(', ');
    console.log(`Checking for elements matching: ${selector}`);
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        console.log(`Hiding element:`, el);
        el.style.display = 'none';
    });
}

// Throttled version of hideElements
const hideElementsDebounced = debounce(() => {
    hideElements();
    disable_autoplay();
}, 200);

// Observe the page for changes
function observePage() {
    console.log("Setting up MutationObserver...");
    const observer = new MutationObserver(() => {
        console.log("DOM mutation detected.");
        hideElementsDebounced();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log("MutationObserver is now observing the document.");
}

// Check URL and run the script
function checkAndRun() {
    const currentUrl = window.location.href;
    if (currentUrl.includes("youtube.com")) {
        if (currentUrl.includes("watch")){
            console.log("YouTube page detected. Running script.");
            hideElements();
            observePage();
            disable_autoplay();
        }
        else {
            console.log("Not a watch page. Redirecting to Google.");
            window.location.href = "https://www.google.com";
        }
    } else {
        console.log("Not a YouTube page. Skipping script.");
    }
}

console.log("YouTube Hider script loaded. Checking URL...");
checkAndRun();
