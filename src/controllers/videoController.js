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
		console.log(videos);
		return res.render("home", { pageTitle: "Home", videos });
	} catch {
		return res.render("server-error");
	}
};
export const watch = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	return res.render("watch", { pageTitle: video.title, video });
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

export const postUpload = async (req, res) => {
	const { title, description, hashtags } = req.body;
	/* const video = new Video({
		title,
		description,
		createdAt: Date.now(),
		hashtags: hashtags.split(",").map(word => (!word.trim().startsWith("#") ? `#${word.trim()}` : word.trim())),
		meta: {
			views: 0,
			rating: 0,
		},
	});
	await video.save(); */
	try {
		await Video.create({
			title,
			description,
			hashtags: hashtags.split(",").map(word => (!word.trim().startsWith("#") ? `#${word.trim()}` : word.trim())),
		});
		return res.redirect("/");
	} catch (error) {
		return res.render("upload", {
			pageTitle: "Upload Video",
			errorMessage: error._message,
		});
	}
};
