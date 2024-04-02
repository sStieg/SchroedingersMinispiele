var connected = false;
        var socket;

        $( document ).ready(function() {
            connect();
        });

        var connect = function() {
            if (!connected) {
                socket = new WebSocket("ws://schroedinger.hopto.org/api/connect-websocket/vrplayer");
                socket.onopen = function () {
                    connected = true;
                    console.log("Connected to the web socket");
                };

                socket.onmessage = function (m) {
                    console.log(m.data);
                };
            }
        }

        function startGame(message) {
            fetch("http://schroedinger.hopto.org/api/position/", {
                method: "POST",
                mode: "no-cors",
                body: message
            })
        }