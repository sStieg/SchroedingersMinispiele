// for installing all dependencies once run 'npm install'
// for starting the server run 'npm start'
// for starting the server in watchmode run 'npm run dev'

// import modules
import express from "express";
import { join } from "path";
//import { taskRouter } from "./task-router";

// create express application
const app = express();

// mount middleware
//app.use(express.json());    // parse JSON data and place result in req.body
app.get("/", function(request: any, response: any){
    const file = join(__dirname, "../frontend/index.html")
    response.sendFile(file);
});

// mount router(s)
//app.use("/api/tasks", taskRouter);

// start http server
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});