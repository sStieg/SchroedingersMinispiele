var connected = false;
var socket;

$( document ).ready(function() {
    connect();
});

var connect = function() {
    if (!connected) {
        socket = new WebSocket("ws://localhost:8080/connect-websocket/player1");
        socket.onopen = function () {
            connected = true;
            console.log("Connected to the web socket");
        };

        socket.onmessage = function (m) {
            let splittedMessage = m.data.toString().split(":");

            for(let i = 0; i < splittedMessage.length; i++) {
                splittedMessage[i] = splittedMessage[i].trim();
            }

            console.log(splittedMessage);

            if(splittedMessage[1] == "1") {
                startGame(splittedMessage[1])
            }
        };
    }
}

function startGame(gameNumber) {

}