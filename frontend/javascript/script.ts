var connected = false;
var socket;
var solution;

const hostPingPong = document.querySelector("#shadow-pingpong");
//const shadowPingPong = hostPingPong.attachShadow({ mode: "open" });

const hostWordgame = document.querySelector("#shadow-wordgame");
//const shadowWordgame = hostWordgame.attachShadow({ mode: "open" });

const hostHangman = document.querySelector("#shadow-hangman");
//const shadowHangman = hostHangman.attachShadow({ mode: "open" });

$( document ).ready(function() {
    connect();
});

var connect = function() {
    if (!connected) {
        socket = new WebSocket("ws://schroedinger.hopto.org/api/connect-websocket/player1");
        socket.onopen = function () {
            connected = true;
            console.log("Connected to the web socket");
        };

        socket.onmessage = function (m) {
            console.log(m.data);

            var splittedMessage = m.data.toString().split(";");

            solution = splittedMessage[1];

            startGame(splittedMessage[0].split("x")[0], splittedMessage[0].split("x")[1])
        }
    }
}

function startGame(roomNumber, gameNumber) {
    if(!isNaN(gameNumber) && !isNaN(roomNumber)) {
        $('#minigames').css("opacity", "1");

        if(roomNumber == 1) {
            if(gameNumber == 1) {
                $('#shadow-drawguess').css("opacity", "1");
                $("#shadow-drawguess").css("position", "relative");
                $("#shadow-drawguess").css("z-index", "10");
            }
        } else if(roomNumber == 2) {
            if(gameNumber == 1) {
                $('#shadow-wordgame').css("opacity", "1");
                $("#shadow-wordgame").css("position", "relative");
                $("#shadow-wordgame").css("z-index", "10");
            }
        } else if(roomNumber == 3) {
            if(gameNumber == 1) {
                $('#shadow-pingpong').css("opacity", "1");
                $("#shadow-pingpong").css("position", "relative");
                $("#shadow-pingpong").css("z-index", "10");
            }
        }

    }
}

function endGame(){
    socket.send("solution: "+solution);

    $("#minigames").css("opacity", "0");
    $(".game").css("opacity", "0");
    $(".game").css("position", "absolute");
    $(".game").css("z-index", "0");
}