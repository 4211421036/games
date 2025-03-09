Enjine.Resources = {
    Images: {},
    Sounds: {},
    Muted: false, // Tambahkan properti Muted

    Destroy: function() {
        delete this.Images;
        delete this.Sounds;
        return this;
    },
    
    //***********************/
    //Images
    AddImage: function(name, src) {
        var tempImage = new Image();
        this.Images[name] = tempImage;
        tempImage.src = src;
        return this;
    },
    
    AddImages: function(array) {
        for (var i = 0; i < array.length; i++) {
            var tempImage = new Image();
            this.Images[array[i].name] = tempImage;
            tempImage.src = array[i].src;
        }
        return this;
    },
    
    ClearImages: function() {
        delete this.Images;
        this.Images = new Object();
        return this;
    },
    
    RemoveImage: function(name) {
        delete this.Images[name];
        return this;
    },
    
    //***********************/
    //Sounds
    AddSound: function(name, src, maxChannels) {
        this.Sounds[name] = [];
        this.Sounds[name].index = 0;
        if (!maxChannels) {
            maxChannels = 3;
        }
        for (var i = 0; i < maxChannels; i++) {
            this.Sounds[name][i] = new Audio(src);    
        }
        return this;
    },
    
    ClearSounds: function() {
        delete this.Sounds;
        this.Sounds = {};
        return this;
    },
    
    RemoveSound: function(name) {
        delete this.Sounds[name];
        return this;
    },
    
    PlaySound: function(name, loop) {
        if (this.Muted) return; // Jangan mainkan suara jika muted
        if (!this.Sounds[name]) return; // Pastikan suara ada

        if (this.Sounds[name].index >= this.Sounds[name].length) {
            this.Sounds[name].index = 0;    
        }
        if (loop) {
            this.Sounds[name][this.Sounds[name].index].addEventListener("ended", this.LoopCallback, false);
        }
        this.Sounds[name][this.Sounds[name].index++].play();
        return this.Sounds[name].index;
    },
    
    PauseChannel: function(name, index) {
        if (!this.Sounds[name][index].paused) {
            this.Sounds[name][index].pause();
        }
        return this;
    },
    
    PauseSound: function(name) {
        for (var i = 0; i < this.Sounds[name].length; i++) {
            if (!this.Sounds[name][i].paused) {
                this.Sounds[name][i].pause();
            }
        }
        return this;
    },
    
    ResetChannel: function(name, index) {
        this.Sounds[name][index].currentTime = 0;
        this.StopLoop(name, index);
        return this;
    },
    
    ResetSound: function(name) {
        for (var i = 0; i < this.Sounds[name].length; i++) {
            this.Sounds[name][i].currentTime = 0;
            this.StopLoop(name, i);
        }
        return this;
    },
    
    StopLoop: function(name, index) {
        this.Sounds[name][index].removeEventListener("ended", this.LoopCallback, false);    
    },
    
    LoopCallback: function() {
        this.currentTime = -1;
        this.play();
    },

    // Tambahkan fungsi untuk mengatur mute
    SetMute: function(mute) {
        this.Muted = mute;
        if (mute) {
            this.StopAllSounds(); // Hentikan semua suara jika mute
        }
    },

    // Tambahkan fungsi untuk menghentikan semua suara
    StopAllSounds: function() {
        for (var sound in this.Sounds) {
            if (this.Sounds[sound]) {
                for (var i = 0; i < this.Sounds[sound].length; i++) {
                    this.Sounds[sound][i].pause();
                    this.Sounds[sound][i].currentTime = 0;
                }
            }
        }
    }
};
