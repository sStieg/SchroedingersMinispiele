import { readFileSync } from "fs";


let minigameBox = document.getElementById("minigame");
let button = document.getElementById("button")


button.addEventListener("click", requestGame);

async function requestGame() {
    let response = await fetch("http://localhost:3000/posts/1");

    let answer:Boolean = (await response.json()).text;

    if(answer) {
        minigameBox!.innerHTML += answer;

        minigameBox!.innerHTML = readFileSync("./games/pacman/pacman.html", "utf-8");
    } else {
        minigameBox!.innerHTML = "No game available";
    }
    
}
