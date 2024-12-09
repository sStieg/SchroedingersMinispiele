import { BASE_URL } from "./util";

const URL = `http://${BASE_URL}/user`;

export class UserService {
  private userName: string | null;
  private lobbyId: string | null;

  constructor() {
    this.userName = null;
    this.lobbyId = null;
  }

  // Attempt user login
  public async attempUserLogin(userName: string, lobbyId: string): Promise<boolean> {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, lobbyId }),
      });

      if (!response.ok) {
        console.error("Failed to log in user", response.status);
        return false;
      }

      const result: LoginResult = await response.json();
      console.log(result.success);

      if (result.success) {
        this.userName = userName;
        this.lobbyId = lobbyId;
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error logging in user:", error);
      return false;
    }
  }

  // Getters for user and lobby IDs
  public get user(): string | null {
    return this.userName;
  }

  public get lobby(): string | null {
    return this.lobbyId;
  }
}

// Login result interface
interface LoginResult {
  success: boolean;
}

// Example usage
/*(async () => {
  const userService = new UserService();
  const loginSuccess = await userService.attempUserLogin("TestUser", "12345");
  console.log("Login Success:", loginSuccess);
})();*/