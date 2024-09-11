export const getJoin = async (req, res) => {
	return res.render("join", { pageTitle: "Join Us!" });
};
export const postJoin = async (req, res) => {
	console.log(req.body);
	res.end();
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
