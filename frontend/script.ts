import { readFile } from "fs/promises";


let minigameBox = document.getElementById("minigame");

minigameBox!.attachShadow({mode: "closed"});

async function requestGame() {
    let response = await fetch("http://localhost:3000/posts/1");

    let answer:Boolean = (await response.json()).text;

    if(answer) {
        minigameBox!.innerHTML = await readFile("./games/pacman/pacman.html", "utf8");
    } else {
        minigameBox!.innerHTML = "No game available";
    }
}