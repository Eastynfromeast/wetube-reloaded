import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
let fileName;
let fileNum = 0;

const FILE_PREFIX = "videoFile_";

const formatFileName = () => {
	const datePart = new Date().toISOString().substring(2, 10).replaceAll("-", "");
	fileName = FILE_PREFIX + datePart + "_" + fileNum;
	fileNum += 1;
	return fileName;
};

const handleDownload = async () => {
	formatFileName();

	const ffmpeg = new FFmpeg();
	await ffmpeg.load();
	ffmpeg.on("log", ({ type, message }) => console.log(message));

	// ffmpeg 세상에 file을 만들어줌!
	ffmpeg.writeFile(`${fileName}.webm`, await fetchFile(videoFile));
	await ffmpeg.exec(["-i", `${fileName}.webm`, "-r", "60", `${fileName}.mp4`]);

	const videoLink = document.createElement("a");
	videoLink.href = videoFile;
	videoLink.download = `${fileName}.webm`;
	document.body.appendChild(videoLink);
	videoLink.click();
	preview.loop = false;
	preview.pause();
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

	recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
	// console.log(recorder); recorder.state == "inactive"
	recorder.ondataavailable = event => {
		console.log("Get the video!", event.data);
		videoFile = URL.createObjectURL(event.data);
		preview.srcObject = null;
		preview.src = videoFile;
		preview.loop = true;
		preview.controls = true;
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
