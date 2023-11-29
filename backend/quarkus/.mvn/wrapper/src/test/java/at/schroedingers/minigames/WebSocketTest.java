package at.schroedingers.minigames;

import java.net.URI;
import java.util.concurrent.TimeUnit;

import jakarta.websocket.ContainerProvider;
import jakarta.websocket.Session;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class WebSocketTest {
    @TestHTTPResource("/connect-websocket/seppi")
    URI uri;

    @Test
    public void testWebsocket() throws Exception {
        try (Session session = ContainerProvider.getWebSocketContainer().connectToServer(WebSocketClient.class, uri)) {
            Assertions.assertEquals("CONNECT", WebSocketClient.MESSAGES.poll(10, TimeUnit.SECONDS));
            session.getAsyncRemote().sendText("hello world");
            Assertions.assertEquals(">> seppi: hello world", WebSocketClient.MESSAGES.poll(10, TimeUnit.SECONDS));
        }
    }

}