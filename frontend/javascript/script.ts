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
            console.log(m.data);

            if(m.data.toString() == '1') {
                startGame(m.data)
            }
        };
    }
}

function startGame(gameNumber) {
    if(gameNumber == 1) {
        $('#minigame').css("opacity", "1");
        $('#pacman-game').css("opacity", "1");
    }
}