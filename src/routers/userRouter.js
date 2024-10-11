import express from "express";
import { remove, see, logout, getEdit, postEdit, startGithubLogin, finishGithubLogin } from "../controllers/userController";
import { protectorMiddleware, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadAvatar.single("avatar"), postEdit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

userRouter.get(":id", see);

export default userRouter;
