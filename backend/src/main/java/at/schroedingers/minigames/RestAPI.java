package at.schroedingers.minigames;

import jakarta.websocket.ContainerProvider;
import jakarta.websocket.Session;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.net.URI;

@Path("/position")
public class RestAPI {

    @GET
    @Path("/{position}")
    public void startGame(@PathParam("position") int position) throws Exception {

        try (Session session = ContainerProvider.getWebSocketContainer().connectToServer(WebSocketClient.class, URI.create("http://localhost:8080/connect-websocket/rest"))) {
            session.getAsyncRemote().sendText(String.format("%d" ,position));
        }

    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String helloWorld() {
        return "hello, world";
    }
}
