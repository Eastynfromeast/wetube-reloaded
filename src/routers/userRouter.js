import express from "express";
import { edit, remove, see, logout, getEdit, postEdit } from "../controllers/userController";
import { protectorMiddleware, uploadFiles } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"), postEdit);

userRouter.get(":id", see);

export default userRouter;
