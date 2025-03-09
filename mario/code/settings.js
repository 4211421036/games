document.addEventListener("DOMContentLoaded", function() {
    // Handle canvas resize
    const canvas = document.getElementById('canvas');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Modal handling
    const modal = document.getElementById('settingsModal');
    const btn = document.getElementById('settingsBtn');
    const span = document.getElementsByClassName("close")[0];
    const muteToggle = document.getElementById('muteToggle');

    // Open modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Mute toggle
    muteToggle.addEventListener('change', function() {
        Enjine.Resources.SetMute(this.checked);
    });

    // Swipe handling for mobile
    let startY = 0;
    modal.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, false);

    modal.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        if (startY < currentY) { // Swipe down to close
            modal.style.display = "none";
        }
    }, false);
});
