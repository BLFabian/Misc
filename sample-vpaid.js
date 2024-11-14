(function() {
    var adContainer, button;


    function initAd() {
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
        
        // Apply CSS styling
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
        
        // Handle button click
        button.addEventListener("click", function() {
            window.open("https://example.com/clickthrough", "_blank");
        });
        
        // Append button to the ad container
        adContainer.appendChild(button);
    }


    function startAd() {
        // This is where you could start ad logic or animations if needed
        console.log("Ad started");
    }


    function stopAd() {
        // Clean up the ad when it's finished
        if (adContainer) {
            document.body.removeChild(adContainer);
        }
        console.log("Ad stopped");
    }


    // Export VPAID methods for the player
    window.getVPAIDAd = function() {
        return {
            initAd: initAd,
            startAd: startAd,
            stopAd: stopAd,
            skipAd: stopAd
        };
    };
})();