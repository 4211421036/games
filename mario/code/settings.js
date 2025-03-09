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
    const modal = document.getElementById("settingsModal");
    const settingsBtn = document.getElementById("settingsBtn");
    const closeBtn = document.querySelector(".close");
    const closeSettingsBtn = document.getElementById("closeSettings");
    const muteToggle = document.getElementById("muteToggle");

    // Buka modal saat tombol settings diklik
    settingsBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    // Tutup modal saat tombol close diklik
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    closeSettingsBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Tutup modal saat klik di luar modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle mute toggle
    muteToggle.addEventListener("change", function() {
        Enjine.Resources.SetMute(this.checked);
    });

    // Set nilai awal mute toggle
    muteToggle.checked = Enjine.Resources.Muted;

    // Set nilai awal checkbox berdasarkan status mute
    muteToggle.checked = Enjine.Resources.Muted;

    // Close when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
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
