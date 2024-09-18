export const localsMiddlware = (req, res, next) => {
	res.locals.siteName = "Nultube";
	res.locals.loggedIn = Boolean(req.session.loggedIn);
	res.locals.loggedInUser = req.session.user || {};
	console.log(res.locals);
	next();
};
