var connected = false;
var socket;
$(document).ready(function () {
    connect();
});
var connect = function () {
    if (!connected) {
        socket = new WebSocket("ws://localhost:8080/api/connect-websocket/player1");
        socket.onopen = function () {
            connected = true;
            console.log("Connected to the web socket");
        };
        socket.onmessage = function (m) {
            console.log(m.data);
            startGame(m.data);
        };
    }
};
function startGame(gameNumber) {
    if (!isNaN(gameNumber)) {
        $('#minigames').css("opacity", "1");
        if (gameNumber == 1) {
            $('#pacman-game').css("opacity", "1");
            $("#pacman-game").css("position", "relative");
        }
        else if (gameNumber == 2) {
            $('#wortspiel').css("opacity", "1");
            $("#wortspiel").css("position", "relative");
        }
    }
}
function endGame() {
    socket.send("solution: HINTER BUCH");
    $("#minigames").css("opacity", "0");
    $(".game").css("opacity", "0");
    $(".game").css("position", "absolute");
}
