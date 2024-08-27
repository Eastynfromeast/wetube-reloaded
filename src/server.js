import express from "express";

const PORT = 4000;

const app = express();

/*
  callback ? the function will be happen when the sever starts
  - need to tell the server what port server is listening for
  - high number ports are usaually available ex.4000
*/

const handleListening = () => {
	console.log(`✅ Server listening on port http://localhost:${PORT} ✅`);
};

app.listen(PORT, handleListening);
