import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
	try {
		const videos = await Video.find({}).sort({ createdAt: "desc" });
		return res.render("home", { pageTitle: "Home", videos });
	} catch {
		return res.render("server-error");
	}
};
export const watch = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.status(404).render("404", { pageTitle: "Video not found" });
	}
	return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404", { pageTitle: "Video not found" });
	}
	return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
};

export const postEdit = async (req, res) => {
	const { id } = req.params;
	const { title, description, hashtags } = req.body;
	const video = await Video.exists({ _id: id });
	if (!video) {
		return res.status(404).render("404", { pageTitle: "Video not found" });
	}

	await Video.findByIdAndUpdate(id, {
		title,
		description,
		hashtags: Video.formatHashtags(hashtags),
	});
	return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
	return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
	const {
		user: { _id },
	} = req.session;

	const { video, thumb } = req.files;
	const { title, description, hashtags } = req.body;
	try {
		const newVideo = await Video.create({
			title,
			description,
			fileUrl: video[0].path,
			thumbUrl: thumb[0].path,
			owner: _id,
			hashtags: Video.formatHashtags(hashtags),
		});
		const user = await User.findById(_id);
		user.videos.push(newVideo._id);
		user.save();
		return res.redirect("/");
	} catch (error) {
		return res.status(400).render("upload", {
			pageTitle: "Upload Video",
			errorMessage: error._message,
		});
	}
};

export const deleteVideo = async (req, res) => {
	const { id } = req.params;
	await Video.findByIdAndDelete({ _id: id });
	return res.redirect("/");
};

export const search = async (req, res) => {
	const { keyword } = req.query;
	console.log("should search", keyword);
	let videos = [];
	if (keyword) {
		videos = await Video.find({
			title: {
				$regex: new RegExp(keyword, "i"),
			},
		});
	}
	return res.render("search", { pageTitle: "Search", videos, keyword });
};
