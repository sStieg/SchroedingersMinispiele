var connected = false;
var socket;
var hostPingPong = document.querySelector("#shadow-pingpong");
var shadowPingPong = hostPingPong.attachShadow({ mode: "open" });
var hostWordgame = document.querySelector("#shadow-wordgame");
var shadowWordgame = hostWordgame.attachShadow({ mode: "open" });
var hostHangman = document.querySelector("#shadow-hangman");
var shadowHangman = hostHangman.attachShadow({ mode: "open" });
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
            $('#shadow-wordgame').css("opacity", "1");
            $("#shadow-wordgame").css("position", "relative");
        }
    }
}
function endGame() {
    socket.send("solution: HINTER BUCH");
    $("#minigames").css("opacity", "0");
    $(".game").css("opacity", "0");
    $(".game").css("position", "absolute");
}
