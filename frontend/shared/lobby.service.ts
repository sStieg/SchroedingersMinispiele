import { BASE_URL } from "./util";

const URL = `http://${BASE_URL}/lobby/`;

export class LobbyService {
  private lobbyId: string | null;

  constructor() {
    this.lobbyId = null;
  }

  public async requestLobbyStatus(lobbyId: string): Promise<boolean> {
    try {
      const response = await fetch(`${URL}${lobbyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch lobby status", response.status);
        return false;
      }

      const result: LoginResult = await response.json();
      console.log(result.success);

      if (result.success) {
        this.lobbyId = lobbyId;
        console.log(lobbyId);
        return true;
      }
      
      console.log("false");
      return false;
    } catch (error) {
      console.error("Error fetching lobby status:", error);
      return false;
    }
  }
}

interface LoginResult {
  success: boolean;
}