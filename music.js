const audio = document.getElementById('cinematicAudio');
const muteBtn = document.getElementById('muteMasterBtn');
const icon = document.getElementById('audioIcon');

let muted = false;

audio.loop = true;

audio.play().catch(() => {
    muted = true;
    audio.muted = true;
    icon.src = "Images/unmute.png";
});

muteBtn.onclick = () => {
    muted = !muted;
    audio.muted = muted;
    icon.src = muted ? "Images/mute.png" : "Images/unmute.png";
    if (!muted && audio.paused) audio.play();
};

