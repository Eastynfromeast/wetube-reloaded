import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
};

// middleware becomes controller when the user tries to access to the "/protected"
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

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);
app.get("/login", handleLogin);

const handleListening = () => {
	console.log(`✅ Server listening on port http://localhost:${PORT} ✅`);
};

app.listen(PORT, handleListening);
