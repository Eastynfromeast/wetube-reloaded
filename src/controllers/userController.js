import User from "../models/User";

export const getJoin = async (req, res) => {
	return res.render("join", { pageTitle: "Join Us!" });
};
export const postJoin = async (req, res) => {
	const { email, username, password, confirmPassword, name, location } = req.body;
	const pageTitle = "Join";
	if (password !== confirmPassword) {
		return res.status(400).render("join", { pageTitle, errorMessage: "Password confirmation does not match" });
	}
	const hasUser = await User.exists({ $or: [{ username }, { email }] });
	if (hasUser) {
		return res.status(400).render("join", { pageTitle, errorMessage: "This username/email is already taken" });
	}

	try {
		await User.create({
			name,
			username,
			email,
			password,
			location,
		});
		return res.redirect("/login");
	} catch (error) {
		return res.status(400).render("join", {
			pageTitle: "Join",
			errorMessage: error._message,
		});
	}
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const getLogin = (req, res) => {
	return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
	const { username, password } = req.body;
	const isUserExisted = await User.exists({ username });
	if (!isUserExisted) {
		return res.status(400).render("login", { pageTitle: "Login", errorMessage: "An account with this username does not exsit." });
	}
	//check if account exists
	// check if the password is correct
	res.end();
};
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
