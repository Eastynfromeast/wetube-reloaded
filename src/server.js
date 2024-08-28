import express from "express";

const PORT = 4000;

const app = express();

const urlLogger = (req, res, next) => {
	console.log(`Path: ${req.path}`);
	next();
};

const timeLogger = (req, res, next) => {
	const time = new Date();
	const year = time.getFullYear();
	const month = time.getMonth();
	const date = time.getDate();
	console.log(`Time: ${year}.${month}.${date}`);
	next();
};

const securityLogger = (req, res, next) => {
	if (req.protocol === "https") {
		console.log("Secure");
	}
	console.log("InSecure");
	next();
};

const protectorMiddleware = (req, res, next) => {
	const url = req.url;
	if (url === "/protected") {
		return res.send("<h1>Not Allowed. Press Go Back</h1>");
	}
	next();
};

const privateMiddleware = (req, res, next) => {
	const url = req.url;
	if (url === "/protected") {
		return res.send("<h1>Not Allowed</h1>");
	}
	console.log("Allowed, you may continue");
	next();
};

// This is controller
const handleHome = (req, res) => {
	return res.send("<h1>Home</h1>");
};

const handleLogin = (req, res) => {
	return res.send({ message: "Login here" });
};

const handleProtected = (req, res) => {
	return res.send("Welcome to the private lounge!");
};

app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);
app.get("/login", handleLogin);

const handleListening = () => {
	console.log(`✅ Server listening on port http://localhost:${PORT} ✅`);
};

app.listen(PORT, handleListening);
