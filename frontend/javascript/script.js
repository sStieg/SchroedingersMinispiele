var connected = false;
var socket;
var hostPingPong = document.querySelector("#shadow-pingpong");
//const shadowPingPong = hostPingPong.attachShadow({ mode: "open" });
var hostWordgame = document.querySelector("#shadow-wordgame");
//const shadowWordgame = hostWordgame.attachShadow({ mode: "open" });
var hostHangman = document.querySelector("#shadow-hangman");
//const shadowHangman = hostHangman.attachShadow({ mode: "open" });
$(document).ready(function () {
    connect();
});
var connect = function () {
    if (!connected) {
        socket = new WebSocket("ws://schroedinger.hopto.org/api/connect-websocket/player1");
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
            $('#shadow-drawguess').css("opacity", "1");
            $("#shadow-drawguess").css("position", "relative");
            $("#shadow-drawguess").css("z-index", "10");
        }
        else if (gameNumber == 2) {
            $('#shadow-wordgame').css("opacity", "1");
            $("#shadow-wordgame").css("position", "relative");
            $("#shadow-wordgame").css("z-index", "10");
        }
        else if (gameNumber == 3) {
            $('#shadow-pingpong').css("opacity", "1");
            $("#shadow-pingpong").css("position", "relative");
            $("#shadow-pingpong").css("z-index", "10");
        }
    }
}
function endGame() {
    socket.send("solution: HINTER BUCH");
    $("#minigames").css("opacity", "0");
    $(".game").css("opacity", "0");
    $(".game").css("position", "absolute");
    $(".game").css("z-index", "0");
}
