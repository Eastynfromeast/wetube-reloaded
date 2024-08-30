import express from "express";
// 모두 독립된 모듈이기 때문에 모든 router 파일에 express를 import 해주어야 함

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

export default globalRouter;
