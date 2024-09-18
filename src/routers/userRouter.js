import express from "express";
import { edit, remove, see, logout, getEdit, postEdit } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get(":id", see);

export default userRouter;
