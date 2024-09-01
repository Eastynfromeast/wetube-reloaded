export const trending = (req, res) =>
	res.send(
		"<!DOCTYPE html><html lang='ko'><head><title>Wetube</title></head><body><h1>Home Page Videos</h1><footer>&copy;2024 Wetube -  All rights reserved</footer><body></html>"
	);
export const see = (req, res) => {
	console.log(req.params);
	res.send(
		`<!DOCTYPE html><html lang='ko'><head><title>Wetube</title></head><body><h1>Watch Video #${req.params.id}</h1><footer>&copy;2024 Wetube -  All rights reserved</footer><body></html>`
	);
};
export const edit = (req, res) => {
	console.log(req.params);
	res.send("Edit Video");
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => {
	console.log(req.params);
	res.send("Delete Video");
};
