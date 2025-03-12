import { BASE_URL, SocketClosed, WebSocket } from "./util";

const ENDPOINT_URL = `ws://${BASE_URL}/chat`;

export class ChatService {
  private socket: WebSocket<string> | null;

  constructor() {
    this.socket = null;
  }

  /**
   * Sends a chat message through the WebSocket connection.
   * @param message The message to send
   */
  public sendMessage(message: string): void {
    if (!this.socket || this.socket.closed) {
      throw new SocketClosed("WebSocket is closed. Unable to send message.");
    }
    this.socket.sendMessage(message);
  }

  /**
   * Connects to the chat WebSocket.
   * @param user The username of the connecting user
   * @param lobbyId The chat room/lobby ID
   * @param onMessage Callback for incoming messages
   * @param onError Callback for errors
   */
  public connect(
    user: string,
    lobbyId: string,
    onMessage: (msg: string) => void,
    onError: (err: string) => void
  ): void {
    if (!this.socket) {
      this.socket = new WebSocket<string>(`${ENDPOINT_URL}/${lobbyId}/${user}`);

      console.log("Connecting to WebSocket...");

      this.socket.errorMessages.subscribe((errorMessage: string) => {
        console.error(`WebSocket error: ${errorMessage}`);
        onError(errorMessage);
      });

      this.socket.messages.subscribe((message: string) => {
        console.log(`Message received: ${message}`);
        onMessage(message);
      });

      this.socket.connect();
    }
  }

  /**
   * Closes the WebSocket connection gracefully.
   */
  public close(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      console.log("WebSocket closed.");
    }
  }
}
