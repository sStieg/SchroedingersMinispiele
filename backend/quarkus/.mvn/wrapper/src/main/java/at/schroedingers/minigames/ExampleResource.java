package at.schroedingers.minigames;

import jakarta.annotation.Resource;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.io.File;
import java.nio.file.Paths;
@Path("/minigames")
public class ExampleResource {

    @GET
    @Produces(MediaType.TEXT_HTML)
    public String hello() {
        return "<h1>Schrödingers Minispiele</h2>";
    }
}
