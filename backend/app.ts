// import modules
import express from "express";
import { join } from "path";
import { minigameRouter } from "./routers/minigameRouter";
//import { taskRouter } from "./task-router";

// create express application
const app = express();

// mount middleware
app.use(express.json());    // parse JSON data and place result in req.body

// mount router(s)
app.use("/minigames", minigameRouter);

// start http server
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});