import express from "express";
import { join } from "path";

export const minigameRouter = express.Router();

minigameRouter.use("/", minigameRouter.use(express.static(join(__dirname, "../../frontend"))))

minigameRouter.use("/1", minigameRouter.use(express.static(join(__dirname, "../../frontend/games/Projekt_Grillparty"))));