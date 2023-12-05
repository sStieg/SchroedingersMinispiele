var connected = false;
var socket;

var connected = false;
var socket;

$( document ).ready(function() {
    connect();
    $("#send").click(sendMessage);

    $("#name").keypress(function(event){
        if(event.keyCode == 13 || event.which == 13) {
            connect();
        }
    });

    $("#msg").keypress(function(event) {
        if(event.keyCode == 13 || event.which == 13) {
            sendMessage();
        }
    });

    $("#chat").change(function() {
        scrollToBottom();
    });

    $("#name").focus();
});

var connect = function() {
    if (!connected) {
        var name = $("#name").val();
        console.log("Val: " + name);
        socket = new WebSocket("ws://localhost:8080/connect-websocket/seppi");
        socket.onopen = function () {
            connected = true;
            console.log("Connected to the web socket");
            $("#send").attr("disabled", "false");
            $("#connect").attr("disabled", "true");
            $("#name").attr("disabled", "true");
            $("#msg").focus();
        };
        socket.onmessage = function (m) {
            console.log("Got message: " + m.data);
            $("#chat").append(m.data + "\n");
            scrollToBottom();
        };
    }
}

var sendMessage = function() {
    if (connected) {
        var value = $("#msg").val();
        console.log("Sending " + value);
        socket.send(value);
        $("#msg").val("");
    }
};

var scrollToBottom = function () {
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
};