import Video from "../models/Video";

export const home = (req, res) => {
	console.log("Starting search...");
	Video.find({})
		.then(function (videos) {
			console.log("Finished");
			return res.render("home", { pageTitle: "Home", videos: [] });
		})
		.catch(function (err) {
			console.log("errors", err);
		});
	console.log("I finished first");
};
export const watch = (req, res) => {
	const { id } = req.params;
	return res.render("watch", { pageTitle: `Watch Video` });
};
export const getEdit = (req, res) => {
	const { id } = req.params;
	return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	videos[id].title = title;
	return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
	return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
	const { title } = req.body;

	return res.redirect("/");
};
