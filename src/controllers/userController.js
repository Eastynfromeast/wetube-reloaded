import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = async (req, res) => {
	return res.render("join", { pageTitle: "Join Us!" });
};
export const postJoin = async (req, res) => {
	const { email, username, password, confirmPassword, name, location } = req.body;
	const pageTitle = "Join";
	if (password !== confirmPassword) {
		return res.status(400).render("join", { pageTitle, errorMessage: "Password confirmation does not match" });
	}
	const user = await User.exists({ $or: [{ username }, { email }] });
	if (user) {
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
	const pageTitle = "Login";
	//check if account exists
	const user = await User.findOne({ username });
	if (!user) {
		return res.status(400).render("login", { pageTitle, errorMessage: "An account with this username does not exsit." });
	}
	// check if the password is correct
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) {
		return res.status(400).render("login", { pageTitle, errorMessage: "Wrong password" });
	}
	req.session.loggedIn = true;
	req.session.user = user;
	return res.redirect("/");
};
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");

export const getEdit = (req, res) => {
	return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
	const {
		session: {
			user: { _id },
		},
		body: { name, email, username, location },
		file,
	} = req;
	console.log(file);
	const updatedUser = await User.findByIdAndUpdate(
		_id,
		{
			name,
			email,
			username,
			location,
		},
		{ new: true }
	);
	req.session.user = updatedUser;
	return res.redirect("/users/edit");
};
