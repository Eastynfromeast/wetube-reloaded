import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true, maxLength: 80 },
	fileUrl: { type: String, required: true },
	description: { type: String, required: true, trim: true, minLength: 20 },
	createdAt: { type: Date, required: true, default: Date.now },
	hashtags: [{ type: String, trim: true }],
	meta: {
		views: { type: Number, default: 0, required: true },
		rating: { type: Number, default: 0, required: true },
	},
});

/* videoSchema.pre("save", async function () {
	this.hashtags = this.hashtags[0]
		.split(",")
		.map(word => (!word.trim().startsWith("#") ? `#${word.trim().replaceAll(" ", "_")}` : word.trim().replaceAll(" ", "_")));
}); */

videoSchema.static("formatHashtags", function (hashtags) {
	return hashtags.split(",").map(word => (!word.trim().startsWith("#") ? `#${word.trim().replaceAll(" ", "_")}` : word.trim().replaceAll(" ", "_")));
});

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
