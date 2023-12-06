package at.schroedingers.minigames;

import jakarta.websocket.ClientEndpoint;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;

import java.util.concurrent.LinkedBlockingDeque;

@ClientEndpoint
public class WebSocketClient {
    public static final LinkedBlockingDeque<String> MESSAGES = new LinkedBlockingDeque<>();

    @OnOpen
    public void open(Session session) {
        MESSAGES.add("CONNECT");
    }

    @OnMessage
    public void message(String msg) {
        MESSAGES.add(msg);
    }

}