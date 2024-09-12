import User from "../models/User";

export const getJoin = async (req, res) => {
	return res.render("join", { pageTitle: "Join Us!" });
};
export const postJoin = async (req, res) => {
	const { email, username, password, confirmPassword, name, location } = req.body;
	const pageTitle = "Join";
	if (password !== confirmPassword) {
		return res.render("join", { pageTitle, errorMessage: "Password confirmation does not match" });
	}
	const hasUser = await User.exists({ $or: [{ username }, { email }] });
	if (hasUser) {
		return res.render("join", { pageTitle, errorMessage: "This username/email is already taken" });
	}

	await User.create({
		name,
		username,
		email,
		password,
		location,
	});
	return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
