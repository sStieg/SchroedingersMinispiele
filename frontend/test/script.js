var connected = false;
var currentGame;
        var socket;

        $( document ).ready(function() {
            connect();
        });

        var connect = function() {
            if (!connected) {
                socket = new WebSocket("wss://" + window.location.host + "/api/connect-websocket/vrplayer");
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

        function startGame(message, gameElement) {
            currentGame = gameElement;
            fetch("https://" + window.location.host + "/api/position/", {
                method: "POST",
                mode: "no-cors",
                body: message
            })
        }