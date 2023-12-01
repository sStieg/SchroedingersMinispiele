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
        // Send a message to indicate that we are ready,
        // as the message handler may not be registered immediately after this callback.
        session.getAsyncRemote().sendText("_ready_");
    }

    @OnMessage
    public void message(String msg) {
        MESSAGES.add(msg);
    }

}