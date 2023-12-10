package at.schroedingers.minigames;

import jakarta.websocket.ContainerProvider;
import jakarta.websocket.Session;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.net.URI;

@Path("/api")
public class RestAPI {

    @GET
    @Path("/position/{position}")
    public void startGame(@PathParam("position") int position) throws Exception {

        try (Session session = ContainerProvider.getWebSocketContainer().connectToServer(WebSocketClient.class, URI.create("http://localhost:8080/connect-websocket/rest"))) {
            session.getAsyncRemote().sendText(String.format("%d" ,position));
        }

    }
}
