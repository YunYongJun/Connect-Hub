import express from "express";
import { homeController } from "../controller/homeController";

const homeRouter = express.Router();

homeRouter.get("/", homeController);

export default homeRouter;