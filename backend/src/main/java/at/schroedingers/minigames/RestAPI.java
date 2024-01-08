package at.schroedingers.minigames;

import jakarta.websocket.ContainerProvider;
import jakarta.websocket.Session;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.net.URI;

@Path("/position")
public class RestAPI {

    @POST
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.MEDIA_TYPE_WILDCARD)
    public void startGame(int position) throws Exception {
        System.out.println(position);
        try (Session session = ContainerProvider.getWebSocketContainer().connectToServer(WebSocketClient.class, URI.create("http://localhost:8080/api/connect-websocket/rest"))) {
            session.getAsyncRemote().sendText(String.format("%d" ,position));
        }

    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String helloWorld() {
        return "hello, world";
    }
}
