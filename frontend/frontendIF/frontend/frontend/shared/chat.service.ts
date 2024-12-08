import { BASE_URL, SocketClosed, WebSocket } from "./util";

const ENDPOINT_URL = `ws://${BASE_URL}/chat`;

export class ChatService {
  private socket: WebSocket<string> | null;

  constructor() {
    this.socket = null;
  }

  // Send a chat message
  public sendMessage(message: string): void {
    if (this.socket === null || this.socket.closed) {
      throw new SocketClosed();
    }
    this.socket.sendMessage(message);
  }

  // Connect to the chat WebSocket
  public connect(user: string, lobbyId: string, onMessage: (msg: string) => void, onError: (err: string) => void): void {
    if (this.socket === null) {
      this.socket = new WebSocket<string>(`${ENDPOINT_URL}/${lobbyId}/${user}`);
      console.log("Connected to WebSocket");

      // Subscribe to error messages
      this.socket.errorMessages.subscribe((eMsg: string) => {
        console.error(`WebSocket error: ${eMsg}`);
        onError(eMsg);
      });

      // Subscribe to incoming messages
      this.socket.messages.subscribe((msg: string) => {
        console.log(`Received message: ${msg}`);
        onMessage(msg);
      });

      this.socket.connect();
    }
  }

  // Close the WebSocket connection
  public close(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      console.log("WebSocket closed");
    }
  }
}

// Example Usage
/*const chatService = new ChatService();
chatService.connect(
  "TestUser",
  "12345",
  (msg) => console.log("Message received:", msg),
  (err) => console.error("WebSocket error:", err)
);

chatService.sendMessage("Hello, World!");
chatService.close();*/