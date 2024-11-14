(function() {
    var adContainer, button, adDuration = 30, intervalId, remainingTime = adDuration, adPaused = false, adVolume = 1.0;
    var eventCallbacks = {};

    function initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
        // Create the ad container
        adContainer = document.createElement("div");
        adContainer.style.position = "absolute";
        adContainer.style.width = width + "px";
        adContainer.style.height = height + "px";
        adContainer.style.backgroundColor = "#000";
        document.body.appendChild(adContainer);

        // Create the button
        button = document.createElement("button");
        button.innerText = "Click Me!";
        button.style.position = "absolute";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.padding = "10px 20px";
        button.style.fontSize = "16px";
        button.style.color = "#FFFFFF";
        button.style.backgroundColor = "#007BFF";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.opacity = "0.9";

        button.addEventListener("click", function() {
            window.open("https://example.com/clickthrough", "_blank");
            if (typeof eventCallbacks['AdClickThru'] === 'function') {
                eventCallbacks['AdClickThru']('https://example.com/clickthrough', '0', true);
            }
        });

        adContainer.appendChild(button);

        // Notify that the ad has been loaded
        if (typeof eventCallbacks['AdLoaded'] === 'function') {
            eventCallbacks['AdLoaded']();
        }
    }

    function startAd() {
        // Start the ad logic
        if (typeof eventCallbacks['AdStarted'] === 'function') {
            eventCallbacks['AdStarted']();
        }

        // Simulate ad duration
        intervalId = setInterval(function() {
            if (!adPaused) {
                remainingTime -= 1;
                if (remainingTime <= 0) {
                    stopAd();
                }
            }
        }, 1000);
    }

    function stopAd() {
        // Clean up the ad
        clearInterval(intervalId);
        if (adContainer) {
            document.body.removeChild(adContainer);
        }
        if (typeof eventCallbacks['AdStopped'] === 'function') {
            eventCallbacks['AdStopped']();
        }
    }

    function pauseAd() {
        adPaused = true;
        if (typeof eventCallbacks['AdPaused'] === 'function') {
            eventCallbacks['AdPaused']();
        }
    }

    function resumeAd() {
        adPaused = false;
        if (typeof eventCallbacks['AdPlaying'] === 'function') {
            eventCallbacks['AdPlaying']();
        }
    }

    function getAdDuration() {
        return adDuration;
    }

    function getAdRemainingTime() {
        return remainingTime;
    }

    function setAdVolume(volume) {
        adVolume = volume;
        if (typeof eventCallbacks['AdVolumeChanged'] === 'function') {
            eventCallbacks['AdVolumeChanged']();
        }
    }

    function getAdVolume() {
        return adVolume;
    }

    function subscribe(callback, eventName) {
        eventCallbacks[eventName] = callback;
    }

    function unsubscribe(eventName) {
        delete eventCallbacks[eventName];
    }

    // Export the VPAID interface
    window.getVPAIDAd = function() {
        return {
            handshakeVersion: function(version) { return "2.0"; },
            initAd: initAd,
            startAd: startAd,
            stopAd: stopAd,
            pauseAd: pauseAd,
            resumeAd: resumeAd,
            getAdDuration: getAdDuration,
            getAdRemainingTime: getAdRemainingTime,
            setAdVolume: setAdVolume,
            getAdVolume: getAdVolume,
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };
    };
})();
