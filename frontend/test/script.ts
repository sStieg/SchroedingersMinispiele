var connected = false;
var currentGame;
var socket;
const url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port

$( document ).ready(() => {
    connect();
});

var connect = function() {
    if (!connected) {
        socket = new WebSocket(url + "/api/connect-websocket/vrplayer");
        socket.onopen = function () {
            connected = true;
            console.log("Connected to the web socket");
        };

        socket.onmessage = function (m) {
            console.log(m.data);

            if(m.data.toString().includes("won game")) {
                currentGame.style.backgroundColor = "green";
            }
        };
    }
}

export function startGame(message, gameElement) {
    currentGame = gameElement;
    fetch(url + "/api/position/", {
        method: "POST",
        mode: "no-cors",
        body: message
    })
}
        