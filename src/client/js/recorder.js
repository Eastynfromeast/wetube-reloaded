const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

const handleStart = async () => {
	let stream = null;
	try {
		stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: { width: 270, height: 480 },
		});
		preview.srcObject = stream;
		preview.play();
	} catch (error) {}
};

startBtn.addEventListener("click", handleStart);
