import {
    startBasketBallGame
} from "./components/games/basketball/basketball-game-component";
import { startPaperBinGame } from "./components/games/paperbin/paper-bin-component";

export {solution};

let solution;
let connected = false;
let socket;
let currentRoomNumber;
let username = "player1"


$( document ).ready(function() {
    connect();
});

var connect = function() {
    if (!connected) {
        socket = new WebSocket("wss://" + window.location.host + "/api/connect-websocket/",username);
        socket.onopen = function () {
            connected = true;
            console.log("Connected to the web socket");
        };

        socket.onmessage = function (m) {
            console.log(m.data);

            let splittedMessage = m.data.toString().split(";");

            solution = splittedMessage[1];

            startGame(splittedMessage[0].split("x")[0], splittedMessage[0].split("x")[1])
        }
    }
}

function startGame(roomNumber?: number, gameNumber?: number) {
    if(!isNaN(gameNumber) && !isNaN(roomNumber)) {
        $('#minigames').css("display", "block");

        if(currentRoomNumber != undefined) {
            $('#room'+currentRoomNumber).css("border-color", "#FF95007A");
            $('#room'+currentRoomNumber).css("background-color", "#fff");
        }

        currentRoomNumber = roomNumber;

        $('#room'+roomNumber).css("border-color", "#FF6800");
        $('#room'+roomNumber).css("background-color", "#FF940026");


        if(roomNumber == 1) {
            if(gameNumber == 1) {
                $('#basketballGame').css("opacity", "1");
                $("#basketballGame").css("position", "relative");
                $("#basketballGame").css("z-index", "15");
                startBasketBallGame()
            } else if(gameNumber == 2) {
                $('#paperBinGame').css("opacity", "1");
                $("#paperBinGame").css("position", "relative");
                $("#paperBinGame").css("z-index", "15");
                startPaperBinGame();
            }
        } else if(roomNumber == 2) {
            if(gameNumber == 1) {
                $('#drawguess').css("opacity", "1");
                $("#drawguess").css("position", "relative");
                $("#drawguess").css("z-index", "10");
            }
        } else if(roomNumber == 3) {
            if(gameNumber == 1) {
                $('#pingpong').css("opacity", "1");
                $("#pingpong").css("position", "relative");
                $("#pingpong").css("z-index", "10");
            }
        }

    }
}

export function endGame(){
    socket.send("won game");

    $("#minigames").css("display", "none");
    $(".game").css("opacity", "0");
    $(".game").css("position", "absolute");
    $(".game").css("z-index", "0");
}

