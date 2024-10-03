import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
let formattedFileName;
let fileNum = 0;

const FILE_PREFIX = "videoFile_";

const formatFileName = () => {
	const datePart = new Date().toISOString().substring(2, 10).replaceAll("-", "");
	formattedFileName = FILE_PREFIX + datePart + "_" + fileNum;
	fileNum += 1;
	return formattedFileName;
};

const downloadFile = (fileUrl, fileName) => {
	const fileLink = document.createElement("a");
	fileLink.href = fileUrl;
	fileLink.download = fileName;
	document.body.appendChild(fileLink);
	fileLink.click();
};

const handleDownload = async () => {
	actionBtn.removeEventListener("click", handleDownload);
	actionBtn.innerText = "Transcoding...";
	actionBtn.disabled = true;

	formatFileName();

	let files = {
		input: `${formattedFileName}.webm`,
		output: `${formattedFileName}.mp4`,
		thumb: `thumbnail_${formattedFileName}.jpg`,
	};

	const ffmpeg = new FFmpeg();
	await ffmpeg.load();
	ffmpeg.on("log", ({ type, message }) => console.log(message));

	// ffmpeg 세상에 file을 만들어줌!
	ffmpeg.writeFile(files.input, await fetchFile(videoFile));

	await ffmpeg.exec(["-i", files.input, "-r", "60", files.output]);

	await ffmpeg.exec(["-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb]);

	const mp4File = await ffmpeg.readFile(files.output);
	const thumbFile = await ffmpeg.readFile(files.thumb);

	const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
	const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

	const mp4Url = URL.createObjectURL(mp4Blob);
	const thumbUrl = URL.createObjectURL(thumbBlob);

	downloadFile(mp4Url, files.output);
	downloadFile(thumbUrl, files.thumb);

	preview.loop = false;
	preview.pause();

	const deleteSourceFile = await ffmpeg.deleteFile(files.input);
	const deleteMp4File = await ffmpeg.deleteFile(files.output);
	const deleteThumbnail = await ffmpeg.deleteFile(files.thumb);

	console.log(deleteSourceFile, deleteMp4File, deleteThumbnail);

	URL.revokeObjectURL(mp4Url);
	URL.revokeObjectURL(thumbUrl);
	URL.revokeObjectURL(videoFile);

	actionBtn.disabled = false;
	actionBtn.innerText = "Record Again";
	actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
	actionBtn.innerText = "Download Recording";
	actionBtn.removeEventListener("click", handleStop);
	actionBtn.addEventListener("click", handleDownload);
	recorder.stop();
};

const handleStart = () => {
	actionBtn.innerText = "Stop recording";
	actionBtn.removeEventListener("click", handleStart);
	actionBtn.addEventListener("click", handleStop);

	recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
	// console.log(recorder); recorder.state == "inactive"
	recorder.ondataavailable = event => {
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

actionBtn.addEventListener("click", handleStart);
