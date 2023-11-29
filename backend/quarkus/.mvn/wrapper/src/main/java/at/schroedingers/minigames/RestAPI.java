package at.schroedingers.minigames;

import jakarta.websocket.ContainerProvider;
import jakarta.websocket.Session;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.net.URI;

@Path("/api")
public class RestAPI {

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("/players/{player}/{position}")
    public void startGame(@PathParam("player") String player, @PathParam("position") int position) throws Exception {
        try (Session session = ContainerProvider.getWebSocketContainer().connectToServer(WebSocketClient.class, URI.create("http://localhost:8080/connect-websocket/rest"))) {
            session.getAsyncRemote().sendText(String.format("%s: %d",player ,position));
        }
    }
}
