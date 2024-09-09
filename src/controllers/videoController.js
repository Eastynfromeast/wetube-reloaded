import Video from "../models/Video";

/* Callback way
console.log("start");
Video.find({}).then(
	if(error){
		return res.render("server-error");
	}
	return res.render("home",{pageTitle:"Home", videos});
);
console.log("finished");
*/

export const home = async (req, res) => {
	try {
		const videos = await Video.find({});
		return res.render("home", { pageTitle: "Home", videos });
	} catch {
		return res.render("server-error");
	}
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
