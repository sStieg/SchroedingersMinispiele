import express from "express";
import { join } from "path";

export const minigameRouter = express.Router();

minigameRouter.get("/", function(req, res) {
    res.sendFile(join(__dirname, "../../frontend/index.html"));
})