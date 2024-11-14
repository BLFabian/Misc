(function() {
    var adContainer, button;

    function initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
        // Create the ad container
        adContainer = document.createElement("div");
        adContainer.style.position = "relative";
        adContainer.style.width = "100%";
        adContainer.style.height = "100%";
        adContainer.style.overflow = "hidden";
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
        });

        adContainer.appendChild(button);
    }

    function startAd() {
        console.log("Ad started");
    }

    function stopAd() {
        if (adContainer) {
            document.body.removeChild(adContainer);
        }
        console.log("Ad stopped");
    }

    function skipAd() {
        stopAd();
    }

    function resizeAd(width, height, viewMode) {
        console.log("Ad resized");
    }

    function pauseAd() {
        console.log("Ad paused");
    }

    function resumeAd() {
        console.log("Ad resumed");
    }

    // Export the VPAID interface functions
    window.getVPAIDAd = function() {
        return {
            handshakeVersion: function(version) { return "2.0"; },
            initAd: initAd,
            startAd: startAd,
            stopAd: stopAd,
            skipAd: skipAd,
            resizeAd: resizeAd,
            pauseAd: pauseAd,
            resumeAd: resumeAd
        };
    };
})();
