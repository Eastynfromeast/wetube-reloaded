const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream = null;

const handleStop = () => {
	startBtn.innerText = "Start Recording";
	startBtn.addEventListener("click", handleStart);
	startBtn.removeEventListener("click", handleStop);
};

const handleStart = () => {
	startBtn.innerText = "Stop recording";
	startBtn.removeEventListener("click", handleStart);
	startBtn.addEventListener("click", handleStop);

	const recorder = new MediaRecorder(stream);
	console.log(recorder); // recorder.state == "inactive"
	recorder.ondataavailable = e => {
		console.log("recording done");
		console.log(e.data);
	};
	recorder.start();
	console.log("recorder with ondataavailabe", recorder); // recorder.state == "recording"
	setTimeout(() => {
		recorder.stop();
	}, 10000);
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
