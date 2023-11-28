package at.schroedingers.minigames;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.nio.file.Files;
import java.nio.file.Paths;

@Path("/api")
public class RestAPI {
    private final String PATH_TO_FRONTEND = "./../../../../frontend";

    @GET
    @Produces(MediaType.TEXT_HTML)
    public String startPage() {
        try {
            Object[] lines = Files.readAllLines(Paths.get(String.format("%s/index.html", PATH_TO_FRONTEND))).toArray();

            String htmlLines = "";

            for(int i = 0; i < lines.length; i++) {
                htmlLines += lines[i] + " ";
            }

            return htmlLines;
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("/players/{playerId}/{position}")
    public String startGame() {
        try {
            Object[] lines = Files.readAllLines(Paths.get(String.format("%s/games/pacman/pacman.html", PATH_TO_FRONTEND))).toArray();

            String htmlLines = "";

            for(int i = 0; i < lines.length; i++) {
                htmlLines += lines[i] + " ";
            }

            return htmlLines;
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
