var connected = false;
var currentGame;
var socket;

const baseURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/";

$( document ).ready(() => {
    connect();
});

var connect = function() {
    if (!connected) {
        socket = new WebSocket(baseURL + "connect-websocket/vrplayer");
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
    fetch(baseURL + "position/", {
        method: "POST",
        mode: "no-cors",
        body: message
    })
}
        