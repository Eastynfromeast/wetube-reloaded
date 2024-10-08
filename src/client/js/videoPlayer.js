const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = e => {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = e => {
	if (video.muted) {
		video.muted = false;
	} else {
		video.muted = true;
	}
	muteBtn.innerText = video.muted ? "Unmute" : "Mute";
	volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = event => {
	const {
		target: { value },
	} = event;
	if (video.muted) {
		video.muted = false;
		muteBtn.innerText = "Mute";
	}

	volumeValue = value;
	video.volume = value;
};

const formatTime = seconds => new Date(seconds * 1000).toISOString().substring(14, 14 + 5);

const handleLoadedMetadata = () => {
	totalTime.innerText = formatTime(Math.floor(video.duration));
	timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
	currentTime.innerText = formatTime(Math.floor(video.currentTime));
	timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = event => {
	const {
		target: { value },
	} = event;
	video.currentTime = value;
};

const handleFullscreen = () => {
	const isFullscreen = document.fullscreenElement;
	if (isFullscreen) {
		document.exitFullscreen();
		fullScreenBtn.innerText = "Enter Full Screen";
	} else {
		videoContainer.requestFullscreen();
		fullScreenBtn.innerText = "Exit Full Screen";
	}
};

const handleMouseMove = () => {
	if (controlsTimeout) {
		clearTimeout(controlsTimeout);
		controlsTimeout = null;
	}
	if (controlsMovementTimeout) {
		clearTimeout(controlsMovementTimeout);
		controlsMovementTimeout = null;
	}
	videoControls.classList.add("showing");
	controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
	controlsTimeout = setTimeout(() => {
		videoControls.classList.remove("showing");
	}, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);

video.addEventListener("timeupdate", handleTimeUpdate);
video.readyState ? handleLoadedMetadata() : video.addEventListener("loadedmetadata", handleLoadedMetadata);

timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);

video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
