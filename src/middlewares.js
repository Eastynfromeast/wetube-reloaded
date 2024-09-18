import multer from "multer";

export const localsMiddlware = (req, res, next) => {
	res.locals.siteName = "Nultube";
	res.locals.loggedIn = Boolean(req.session.loggedIn);
	res.locals.loggedInUser = req.session.user || {};
	console.log(res.locals);
	next();
};

export const protectorMiddleware = (req, res, next) => {
	if (req.session.loggedIn) {
		return next();
	} else {
		return res.redirect("/login");
	}
};

export const publicOnlyMiddleware = (req, res, next) => {
	if (!req.session.loggedIn) {
		return next();
	} else {
		return res.redirect("/");
	}
};

export const uploadAvatar = multer({
	dest: "uploads/avatars",
	limits: { fileSize: 3000000 },
});

export const uploadVideo = multer({
	dest: "uploads/videos",
	limits: { fileSize: 10000000 },
});
