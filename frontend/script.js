let minigameBox = document.getElementById("minigame");

async function requestGame() {
    let response = await fetch("http://localhost:3000/minigames/1");

    console.log(response);

    let answer = JSON.stringify(response);

    minigameBox.innerHTML = answer;
}