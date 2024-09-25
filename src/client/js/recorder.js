const startBtn = document.getElementById("startBtn");

const handleStart = async () => {
	let stream = null;
	try {
		stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});
		console.log(stream);
	} catch (error) {}
};

startBtn.addEventListener("click", handleStart);
