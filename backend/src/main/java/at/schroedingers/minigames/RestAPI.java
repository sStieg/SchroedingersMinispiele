package at.schroedingers.minigames;

import jakarta.inject.Inject;
import jakarta.websocket.ContainerProvider;
import jakarta.websocket.Session;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.net.URI;

@Path("/position")
public class RestAPI {

    @Inject
    WebSocketServer webSocketServer;

    @POST
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.MEDIA_TYPE_WILDCARD)
    public void startGame(String message) {
        System.out.println(message);

        webSocketServer.broadcast(message);
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String helloWorld() {
        return "hello, world";
    }
}
