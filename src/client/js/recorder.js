const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
	const videoLink = document.createElement("a");
	videoLink.href = videoFile;
	videoLink.download = "videoFile.webm";
	document.body.appendChild(videoLink);
	videoLink.click();
};

const handleStop = () => {
	startBtn.innerText = "Download Recording";
	startBtn.removeEventListener("click", handleStop);
	startBtn.addEventListener("click", handleDownload);
	recorder.stop();
};

const handleStart = () => {
	startBtn.innerText = "Stop recording";
	startBtn.removeEventListener("click", handleStart);
	startBtn.addEventListener("click", handleStop);

	recorder = new MediaRecorder(stream);
	// console.log(recorder); recorder.state == "inactive"
	recorder.ondataavailable = event => {
		console.log("Get the video!", event.data);
		videoFile = URL.createObjectURL(event.data);
		preview.srcObject = null;
		preview.src = videoFile;
		preview.loop = true;
		preview.play();
	};
	recorder.start();
	// console.log("recorder with ondataavailabe", recorder); // recorder.state == "recording"
};

const init = async () => {
	try {
		stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: { width: 270, height: 480 },
		});
		preview.srcObject = stream;
		preview.play();
	} catch (error) {}
};

init();

startBtn.addEventListener("click", handleStart);
