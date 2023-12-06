var connected = false;
var socket;

var connected = false;
var socket;

$( document ).ready(function() {
    connect();
});

var connect = function() {
    if (!connected) {
        var name = $("#name").val();
        console.log("Val: " + name);
        socket = new WebSocket("ws://localhost:8080/connect-websocket/seppi");
        socket.onopen = function () {
            connected = true;
            console.log("Connected to the web socket");
        };
        socket.onmessage = function (m) {
            console.log("Got message: " + m.data);
        };
    }
}